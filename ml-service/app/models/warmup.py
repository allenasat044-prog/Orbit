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
    print(f"Loading {adapter.info().checkpoint} (the first run downloads the weights, about 4.5 GB)...")
    grad = np.zeros((256, 256, 3), np.uint8)
    grad[..., 1] = np.linspace(60, 200, 256, dtype=np.uint8)[None, :]
    grad[..., 2] = 40
    path = Path(tempfile.mkdtemp()) / "test.png"
    Image.fromarray(grad).save(path)
    try:
        result = adapter.caption(str(path))
    except Exception as err:
        print(f"Failed: {err}")
        return 1
    print(f"OK on {result['device']} ({result['dtype']}) in {result['latency_ms']} ms")
    print(f"Caption: {result['text']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
