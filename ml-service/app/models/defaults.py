from app.models.candidates import earthgpt, mtrs_change_captioner, skysensegpt, terrascope
from app.models.georsclip import GeoRSCLIPAdapter
from app.models.registry import ModelRegistry
from app.models.rs_llava import RSLlavaAdapter
from app.models.smolvlm import MODEL_ID as DEFAULT_CAPTION_MODEL, SmolVLMAdapter


def register_defaults(registry: ModelRegistry) -> None:
    registry.register(SmolVLMAdapter())
    registry.register(RSLlavaAdapter())
    registry.register(earthgpt())
    registry.register(skysensegpt())
    registry.register(terrascope())
    registry.register(mtrs_change_captioner())
    registry.register(GeoRSCLIPAdapter())


from app.models.georsclip import MODEL_ID as DEFAULT_MATCH_MODEL

__all__ = ["register_defaults", "DEFAULT_CAPTION_MODEL", "DEFAULT_MATCH_MODEL"]
