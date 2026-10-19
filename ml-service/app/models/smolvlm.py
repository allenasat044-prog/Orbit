from __future__ import annotations

import contextlib
import importlib.util
import os
import threading
import time
from typing import Any, Callable

from app.errors import ModelError, ModelUnavailable, UnsupportedTask
from app.models.base import ModelAdapter, ModelInfo

MODEL_ID = "smolvlm-instruct"
CHECKPOINT = "HuggingFaceTB/SmolVLM-Instruct"
MIN_SIDE_PX = 32

DEFAULT_PROMPT = (
    "This is a Sentinel-2 true-colour satellite image at about 10 metres per pixel, with north at the top. "
    "Describe only what is visible: land cover, vegetation, water, roads, built-up areas and how they are arranged, "
    "focusing on the centre of the image. Do not name places, count objects or guess dates. "
    "If something is unclear at this resolution, say so. Answer in 2 or 3 sentences."
)


def resolve_model_class(transformers_module: Any) -> Any:
    for name in ("AutoModelForImageTextToText", "AutoModelForVision2Seq"):
        cls = getattr(transformers_module, name, None)
        if cls is not None:
            return cls
    raise ModelUnavailable("This version of transformers has no image-text-to-text model class. Run: pip install -U transformers")


def dtype_kwarg(version: str) -> str:
    parts = version.split(".")
    try:
        major, minor = int(parts[0]), int(parts[1])
    except (ValueError, IndexError):
        return "dtype"
    return "dtype" if (major, minor) >= (4, 56) else "torch_dtype"


def pick_dtype(torch: Any, device: str) -> Any:
    override = os.environ.get("ORBIT_DTYPE")
    if override:
        table = {"float16": torch.float16, "bfloat16": torch.bfloat16, "float32": torch.float32}
        if override not in table:
            raise ModelUnavailable(f"ORBIT_DTYPE must be one of {', '.join(table)}; got {override!r}.")
        return table[override]
    return torch.bfloat16 if device in ("cuda", "mps") else torch.float32


def pick_device(torch: Any) -> str:
    override = os.environ.get("ORBIT_DEVICE")
    if override:
        return override
    if torch.cuda.is_available():
        return "cuda"
    if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available():
        return "mps"
    return "cpu"


class SmolVLMAdapter(ModelAdapter):
    def __init__(self, loader: Callable[[], tuple] | None = None, max_new_tokens: int = 160) -> None:
        self._custom_loader = loader
        self._loader = loader or self._default_loader
        self._max_new_tokens = max_new_tokens
        self._lock = threading.RLock()
        self._bundle: tuple | None = None

    def info(self) -> ModelInfo:
        device = self._bundle[2] if self._bundle else None
        return ModelInfo(
            id=MODEL_ID,
            name="SmolVLM-Instruct (2B)",
            checkpoint=CHECKPOINT,
            tasks=["caption", "vqa"],
            modalities=["optical-rgb"],
            licence="Apache-2.0",
            loaded=self._bundle is not None,
            resources={
                "approx_memory_gb": 4.5,
                "device": device,
                "note": "General-purpose vision-language model; not trained on remote-sensing imagery.",
            },
        )

    def check_availability(self) -> tuple[bool, str | None]:
        if self._custom_loader is not None:
            return True, None
        missing = [m for m in ("torch", "transformers", "PIL") if importlib.util.find_spec(m) is None]
        if missing:
            return False, f"Missing Python packages: {', '.join(missing)}. Run: pip install -r requirements-ml.txt"
        return True, None

    def _default_loader(self) -> tuple:
        import torch
        import transformers
        from transformers import AutoProcessor

        device = pick_device(torch)
        dtype = pick_dtype(torch, device)
        model_cls = resolve_model_class(transformers)
        processor = AutoProcessor.from_pretrained(CHECKPOINT)
        model = model_cls.from_pretrained(CHECKPOINT, **{dtype_kwarg(transformers.__version__): dtype}).to(device)
        model.eval()
        return processor, model, device, str(dtype).replace("torch.", "")

    def load(self) -> None:
        with self._lock:
            if self._bundle is not None:
                return
            ok, reason = self.check_availability()
            if not ok:
                raise ModelUnavailable(reason)
            try:
                self._bundle = self._loader()
            except Exception as err:
                raise ModelUnavailable(f"Could not load {CHECKPOINT}: {err}") from err

    def unload(self) -> None:
        with self._lock:
            self._bundle = None

    def validate_input(self, image_path: str) -> None:
        from PIL import Image, UnidentifiedImageError

        try:
            with Image.open(image_path) as im:
                if min(im.size) < MIN_SIDE_PX:
                    raise UnsupportedTask(f"Image is too small ({im.size[0]}x{im.size[1]} px); at least {MIN_SIDE_PX} px per side is needed.")
        except (UnidentifiedImageError, OSError) as err:
            raise UnsupportedTask(f"Not a readable image: {err}") from err

    def caption(self, image_path: str, prompt: str | None = None, **kwargs: Any) -> dict[str, Any]:
        from PIL import Image

        self.validate_input(image_path)
        self.load()
        processor, model, device, dtype = self._bundle  # type: ignore[misc]
        text = prompt or DEFAULT_PROMPT
        with Image.open(image_path) as im:
            image = im.convert("RGB")

        messages = [{"role": "user", "content": [{"type": "image"}, {"type": "text", "text": text}]}]
        chat = processor.apply_chat_template(messages, add_generation_prompt=True)
        inputs = processor(text=chat, images=[image], return_tensors="pt").to(device)

        try:
            import torch

            mode = torch.inference_mode()
        except ImportError:
            mode = contextlib.nullcontext()

        with self._lock:
            started = time.perf_counter()
            try:
                with mode:
                    ids = model.generate(**inputs, max_new_tokens=self._max_new_tokens, do_sample=False)
            except Exception as err:
                raise ModelError(f"Generation failed: {err}") from err
            latency_ms = int((time.perf_counter() - started) * 1000)

        new_tokens = ids[:, inputs["input_ids"].shape[1]:]
        out = processor.batch_decode(new_tokens, skip_special_tokens=True)[0].strip()
        if not out:
            raise ModelError("The model produced no text.")
        return {
            "text": out,
            "model_id": MODEL_ID,
            "checkpoint": CHECKPOINT,
            "revision": getattr(getattr(model, "config", None), "_commit_hash", None),
            "device": device,
            "dtype": dtype,
            "prompt": text,
            "latency_ms": latency_ms,
        }
