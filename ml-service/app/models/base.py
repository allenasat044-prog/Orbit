from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any

from app.errors import UnsupportedTask


@dataclass
class ModelInfo:
    id: str
    name: str
    checkpoint: str
    tasks: list[str]
    modalities: list[str]
    licence: str
    loaded: bool = False
    available: bool = False
    unavailable_reason: str | None = None
    resources: dict[str, Any] = field(default_factory=dict)


class ModelAdapter(ABC):
    @abstractmethod
    def info(self) -> ModelInfo: ...

    @abstractmethod
    def check_availability(self) -> tuple[bool, str | None]: ...

    @abstractmethod
    def load(self) -> None: ...

    @abstractmethod
    def unload(self) -> None: ...

    def validate_input(self, image_path: str) -> None:
        raise UnsupportedTask("validate_input not implemented")

    def caption(self, image_path: str, **kwargs: Any) -> str:
        raise UnsupportedTask("caption not supported by this model")

    def answer_question(self, image_path: str, question: str, **kwargs: Any) -> str:
        raise UnsupportedTask("answer_question not supported by this model")

    def scene_description(self, image_path: str, **kwargs: Any) -> dict[str, Any]:
        raise UnsupportedTask("scene_description not supported by this model")

    def embed(self, image_path: str | None = None, text: str | None = None) -> list[float]:
        raise UnsupportedTask("embed not supported by this model")

    def ground(self, image_path: str, query: str, **kwargs: Any) -> dict[str, Any]:
        raise UnsupportedTask("ground not supported by this model")

    def compare(self, image_paths: list[str], **kwargs: Any) -> dict[str, Any]:
        raise UnsupportedTask("compare not supported by this model")
