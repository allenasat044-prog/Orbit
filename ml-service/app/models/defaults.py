from app.models.registry import ModelRegistry
from app.models.rs_llava import RSLlavaAdapter
from app.models.smolvlm import MODEL_ID as DEFAULT_CAPTION_MODEL, SmolVLMAdapter


def register_defaults(registry: ModelRegistry) -> None:
    registry.register(SmolVLMAdapter())
    registry.register(RSLlavaAdapter())


__all__ = ["register_defaults", "DEFAULT_CAPTION_MODEL"]
