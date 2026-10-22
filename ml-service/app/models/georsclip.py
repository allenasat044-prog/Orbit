from __future__ import annotations

import importlib.util
import threading
import time
from typing import Any, Callable

import numpy as np

from app.errors import ModelError, ModelUnavailable, UnsupportedTask
from app.models.base import ModelAdapter, ModelInfo
from app.models.smolvlm import MIN_SIDE_PX, pick_device

MODEL_ID = "georsclip-vit-b-32"
HF_REPO = "Zilun/GeoRSCLIP"
HF_FILE = "ckpt/RS5M_ViT-B-32.pt"
CHECKPOINT = f"{HF_REPO}:{HF_FILE}"
PROMPT_TEMPLATE = "a satellite image of {}"

DEFAULT_LABELS = [
    "forest", "farmland", "grassland", "water body", "river", "lake", "urban built-up area", "residential area",
    "industrial area", "airport", "road", "bare land", "desert", "wetland", "snow or ice", "clouds",
]


def _unit(a: np.ndarray) -> np.ndarray:
    a = np.asarray(a, dtype=np.float32)
    return a / np.clip(np.linalg.norm(a, axis=-1, keepdims=True), 1e-8, None)


def _softmax(x: np.ndarray) -> np.ndarray:
    e = np.exp(x - x.max())
    return e / e.sum()


class GeoRSCLIPAdapter(ModelAdapter):
    def __init__(self, loader: Callable[[], dict] | None = None) -> None:
        self._custom_loader = loader
        self._loader = loader or self._default_loader
        self._lock = threading.RLock()
        self._bundle: dict | None = None
        self._text_cache: dict[tuple, np.ndarray] = {}

    def info(self) -> ModelInfo:
        return ModelInfo(
            id=MODEL_ID,
            name="GeoRSCLIP (ViT-B/32)",
            checkpoint=CHECKPOINT,
            tasks=["embed", "classify", "score"],
            modalities=["optical-rgb"],
            licence="Tagged 'cc' on Hugging Face without a specific variant; the GitHub repository states no licence. Fine for local research; check before commercial use.",
            loaded=self._bundle is not None,
            resources={
                "approx_memory_gb": 1.0,
                "checkpoint_size_mb": 605,
                "device": self._bundle["device"] if self._bundle else None,
                "repo": "https://github.com/om-ai-lab/RS5M",
                "weights": "https://huggingface.co/Zilun/GeoRSCLIP",
                "note": "Matches images with text. It does not write captions.",
            },
        )

    def check_availability(self) -> tuple[bool, str | None]:
        if self._custom_loader is not None:
            return True, None
        names = {"torch": "torch", "open_clip": "open_clip_torch", "huggingface_hub": "huggingface_hub", "PIL": "pillow"}
        missing = [pip for mod, pip in names.items() if importlib.util.find_spec(mod) is None]
        if missing:
            return False, f"Missing Python packages: {', '.join(missing)}. Run: pip install -r requirements-ml.txt"
        return True, None

    def _default_loader(self) -> dict:
        import open_clip
        import torch
        from huggingface_hub import hf_hub_download

        device = pick_device(torch)
        path = hf_hub_download(repo_id=HF_REPO, filename=HF_FILE)
        model, _, preprocess = open_clip.create_model_and_transforms("ViT-B/32", pretrained="openai")
        state = torch.load(path, map_location="cpu", weights_only=True)
        result = model.load_state_dict(state, strict=False)
        model = model.to(device).eval()
        tokenizer = open_clip.get_tokenizer("ViT-B-32")
        scale = float(model.logit_scale.exp().item())

        def encode_image(image) -> np.ndarray:
            with torch.inference_mode():
                x = preprocess(image).unsqueeze(0).to(device)
                return model.encode_image(x).float().cpu().numpy()

        def encode_text(texts: list[str]) -> np.ndarray:
            with torch.inference_mode():
                t = tokenizer(texts).to(device)
                return model.encode_text(t).float().cpu().numpy()

        return {
            "encode_image": encode_image,
            "encode_text": encode_text,
            "logit_scale": scale,
            "device": device,
            "dtype": "float32",
            "load_info": {"missing_keys": len(result.missing_keys), "unexpected_keys": len(result.unexpected_keys)},
        }

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
            self._text_cache.clear()

    def validate_input(self, image_path: str) -> None:
        from PIL import Image, UnidentifiedImageError

        try:
            with Image.open(image_path) as im:
                if min(im.size) < MIN_SIDE_PX:
                    raise UnsupportedTask(f"Image is too small ({im.size[0]}x{im.size[1]} px); at least {MIN_SIDE_PX} px per side is needed.")
        except (UnidentifiedImageError, OSError) as err:
            raise UnsupportedTask(f"Not a readable image: {err}") from err

    def _image_vec(self, image_path: str) -> np.ndarray:
        from PIL import Image

        self.validate_input(image_path)
        self.load()
        with Image.open(image_path) as im:
            image = im.convert("RGB")
        try:
            return _unit(self._bundle["encode_image"](image))[0]  # type: ignore[index]
        except Exception as err:
            raise ModelError(f"Image encoding failed: {err}") from err

    def _text_vecs(self, texts: list[str]) -> np.ndarray:
        key = tuple(texts)
        hit = self._text_cache.get(key)
        if hit is not None:
            return hit
        try:
            vecs = _unit(self._bundle["encode_text"](texts))  # type: ignore[index]
        except Exception as err:
            raise ModelError(f"Text encoding failed: {err}") from err
        if len(self._text_cache) >= 64:
            self._text_cache.pop(next(iter(self._text_cache)))
        self._text_cache[key] = vecs
        return vecs

    def _provenance(self, started: float) -> dict[str, Any]:
        b = self._bundle or {}
        return {"model_id": MODEL_ID, "checkpoint": CHECKPOINT, "device": b.get("device"), "dtype": b.get("dtype"), "latency_ms": int((time.perf_counter() - started) * 1000), "load_info": b.get("load_info")}

    def embed(self, image_path: str | None = None, text: str | None = None) -> list[float]:
        if (image_path is None) == (text is None):
            raise UnsupportedTask("Give exactly one of image_path or text.")
        with self._lock:
            if image_path is not None:
                return self._image_vec(image_path).tolist()
            self.load()
            return self._text_vecs([text])[0].tolist()  # type: ignore[list-item]

    def classify(self, image_path: str, labels: list[str] | None = None, top_k: int = 5) -> dict[str, Any]:
        names = labels or DEFAULT_LABELS
        with self._lock:
            started = time.perf_counter()
            img = self._image_vec(image_path)
            txt = self._text_vecs([PROMPT_TEMPLATE.format(n) for n in names])
            probs = _softmax(self._bundle["logit_scale"] * (txt @ img))  # type: ignore[index]
            order = np.argsort(-probs)[: max(1, min(top_k, len(names)))]
            return {"labels": [{"label": names[i], "score": round(float(probs[i]), 4)} for i in order], "prompt_template": PROMPT_TEMPLATE, "label_set": "custom" if labels else "default", **self._provenance(started)}

    def score(self, image_path: str, texts: list[str]) -> dict[str, Any]:
        with self._lock:
            started = time.perf_counter()
            img = self._image_vec(image_path)
            sims = self._text_vecs(texts) @ img
            return {"scores": [{"text": t, "similarity": round(float(s), 4)} for t, s in zip(texts, sims)], **self._provenance(started)}
