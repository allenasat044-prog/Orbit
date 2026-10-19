from __future__ import annotations

from dataclasses import asdict

from app.models.base import ModelAdapter


class ModelRegistry:
    def __init__(self) -> None:
        self._adapters: dict[str, ModelAdapter] = {}

    def register(self, adapter: ModelAdapter) -> None:
        model_id = adapter.info().id
        if model_id in self._adapters:
            raise ValueError(f"Model already registered: {model_id}")
        self._adapters[model_id] = adapter

    def unregister(self, model_id: str) -> None:
        self._adapters.pop(model_id, None)

    def get(self, model_id: str) -> ModelAdapter | None:
        return self._adapters.get(model_id)

    def list(self) -> list[dict]:
        out = []
        for adapter in self._adapters.values():
            info = adapter.info()
            available, reason = adapter.check_availability()
            info.available = available
            info.unavailable_reason = reason
            out.append(asdict(info))
        return out

    def __len__(self) -> int:
        return len(self._adapters)


registry = ModelRegistry()
