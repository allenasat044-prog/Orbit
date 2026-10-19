from __future__ import annotations

from typing import Any

from app.errors import ModelUnavailable
from app.models.base import ModelAdapter, ModelInfo

REASON = (
    "Not runnable on this machine: the reference code needs the original LLaVA package and a CUDA GPU "
    "(a 7B model needs about 14 GB in fp16), and an adapter for that codebase is not implemented yet."
)


class RSLlavaAdapter(ModelAdapter):
    def info(self) -> ModelInfo:
        return ModelInfo(
            id="rs-llava-7b",
            name="RS-LLaVA (7B LoRA)",
            checkpoint="BigData-KSU/RS-llava-v1.5-7b-LoRA (base: Intel/neural-chat-7b-v3-3)",
            tasks=["caption", "vqa"],
            modalities=["optical-rgb"],
            licence="See the upstream repository licence file (not yet verified for this project)",
            resources={
                "approx_memory_gb": 14,
                "note": "Trained on very high-resolution aerial imagery (UCM, NWPU, RSICD, UAV), not 10 m Sentinel-2.",
            },
        )

    def check_availability(self) -> tuple[bool, str | None]:
        return False, REASON

    def load(self) -> None:
        raise ModelUnavailable(REASON)

    def unload(self) -> None:
        return None

    def caption(self, image_path: str, **kwargs: Any) -> str:
        raise ModelUnavailable(REASON)
