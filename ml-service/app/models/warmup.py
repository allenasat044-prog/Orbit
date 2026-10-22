import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

from app.models.defaults import DEFAULT_CAPTION_MODEL, register_defaults
from app.models.registry import ModelRegistry


def main() -> int:
    model_id = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_CAPTION_MODEL
    reg = ModelRegistry()
    register_defaults(reg)
    adapter = reg.get(model_id)
    if adapter is None:
        print(f"Unknown model: {model_id}")
        return 1
    ok, reason = adapter.check_availability()
    if not ok:
        print(f"{model_id} is not available: {reason}")
        return 1
    info = adapter.info()
    size = {"georsclip-vit-b-32": "about 0.6 GB (plus the base model, about 0.4 GB)"}.get(model_id, "about 4.5 GB")
    print(f"Loading {info.checkpoint} (the first run downloads the weights, {size})...")
    grad = np.zeros((256, 256, 3), np.uint8)
    grad[..., 1] = np.linspace(60, 200, 256, dtype=np.uint8)[None, :]
    grad[..., 2] = 40
    path = Path(tempfile.mkdtemp()) / "test.png"
    Image.fromarray(grad).save(path)
    try:
        if "caption" in info.tasks:
            result = adapter.caption(str(path))
        else:
            result = adapter.classify(str(path), top_k=3)
    except Exception as err:
        print(f"Failed: {err}")
        return 1
    print(f"OK on {result['device']} ({result['dtype']}) in {result['latency_ms']} ms")
    if "text" in result:
        print(f"Caption: {result['text']}")
    else:
        print("Top scene tags for the test image: " + ", ".join(f"{x['label']} {x['score']:.0%}" for x in result["labels"]))
        li = result.get("load_info") or {}
        print(f"Weights loaded with {li.get('missing_keys')} missing and {li.get('unexpected_keys')} unexpected keys (a few of either is normal).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
