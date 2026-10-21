from __future__ import annotations

from typing import Any

from app.errors import ModelUnavailable
from app.models.base import ModelAdapter, ModelInfo

VERIFIED_ON = "2026-10-20"


class CandidateAdapter(ModelAdapter):
    """A research model that is documented in the registry but cannot run here yet."""

    def __init__(self, *, model_id: str, name: str, checkpoint: str, tasks: list[str], modalities: list[str], licence: str, reason: str, resources: dict[str, Any]) -> None:
        self._info = ModelInfo(
            id=model_id,
            name=name,
            checkpoint=checkpoint,
            tasks=tasks,
            modalities=modalities,
            licence=licence,
            resources={**resources, "verified_on": VERIFIED_ON},
        )
        self._reason = reason

    def info(self) -> ModelInfo:
        return self._info

    def check_availability(self) -> tuple[bool, str | None]:
        return False, self._reason

    def load(self) -> None:
        raise ModelUnavailable(self._reason)

    def unload(self) -> None:
        return None

    def caption(self, image_path: str, **kwargs: Any) -> str:
        raise ModelUnavailable(self._reason)


def earthgpt() -> CandidateAdapter:
    return CandidateAdapter(
        model_id="earthgpt",
        name="EarthGPT",
        checkpoint="none released",
        tasks=["caption", "vqa", "grounding", "detection", "scene-classification"],
        modalities=["optical", "sar", "infrared"],
        licence="No licence file in the official repository",
        reason="Not runnable: the official repository (wivizhang/EarthGPT) contains only a README and images. No model weights or inference code are published, only the MMRS-1M training dataset.",
        resources={"repo": "https://github.com/wivizhang/EarthGPT", "paper": "https://arxiv.org/abs/2401.16822", "weights": "not published", "dataset": "MMRS-1M (Baidu and OneDrive links)"},
    )


def skysensegpt() -> CandidateAdapter:
    return CandidateAdapter(
        model_id="skysensegpt",
        name="SkySenseGPT",
        checkpoint="none linked",
        tasks=["caption", "vqa", "scene-graph"],
        modalities=["optical"],
        licence="Apache-2.0 (repository code)",
        reason="Not runnable: the repository publishes the FIT-RS dataset and evaluation benchmarks, but the SkySenseGPT model entry has no download link, so no public weights were found.",
        resources={"repo": "https://github.com/yijiecaoming/SkySenseGPT", "paper": "https://arxiv.org/abs/2406.10100", "weights": "no public link found", "dataset": "FIT-RS, FIT-RSFG and FIT-RSRC on Hugging Face (ll-13/FIT-RS)", "base": "LLaVA-1.5 and GeoChat code"},
    )


def terrascope() -> CandidateAdapter:
    return CandidateAdapter(
        model_id="terrascope-8b",
        name="TerraScope (8B)",
        checkpoint="sy1998/TerraScope",
        tasks=["pixel-grounded-reasoning", "vqa", "multitemporal-reasoning"],
        modalities=["optical", "sar"],
        licence="Repository code Apache-2.0; checkpoint licence follows the original licences and is not yet confirmed",
        reason="Not runnable yet: an 8B model needs about 16 GB for its weights in half precision, which does not fit in 16 GB of shared memory, and its custom dual-decoder code is not integrated. Inference requirements and the checkpoint licence still need to be read from the TerraScope folder of the repository.",
        resources={"repo": "https://github.com/shuyansy/Earth-Observation-VLMs", "project": "https://shuyansy.github.io/terrascope/", "paper": "https://arxiv.org/abs/2603.19039", "weights": "https://huggingface.co/sy1998/TerraScope", "benchmark": "sy1998/TerraScope-Bench", "approx_memory_gb": 16},
    )
