from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

from app.raster import save_png_atomic

CLOUD_CLASSES = (0, 1, 3, 8, 9, 10)
SCL_NAMES = {
    0: "no data", 1: "saturated or defective", 2: "dark area", 3: "cloud shadow", 4: "vegetation", 5: "not vegetated",
    6: "water", 7: "unclassified", 8: "cloud (medium probability)", 9: "cloud (high probability)", 10: "thin cirrus", 11: "snow or ice",
}
MIN_VALID_FRACTION = 0.3
WARN_VALID_FRACTION = 0.6
K_MAD = 3.5
MIN_THRESHOLD = 18.0
MIN_COMPONENT_PX = 12
OVERLAY_RGBA = (230, 40, 40, 150)


class ChangeError(Exception):
    def __init__(self, code: str, message: str, status: int = 422) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.status = status


def _load_rgb(path: Path) -> np.ndarray:
    if not path.exists():
        raise ChangeError("image_not_found", f"Image file does not exist: {path.name}", 404)
    with Image.open(path) as im:
        return np.asarray(im.convert("RGB"), dtype=np.float32)


def _load_labels(path: Path, shape: tuple[int, int]) -> np.ndarray:
    if not path.exists():
        raise ChangeError("image_not_found", f"Class map does not exist: {path.name}", 404)
    with Image.open(path) as im:
        arr = np.asarray(im.convert("L"), dtype=np.uint8)
    if arr.shape != shape:
        raise ChangeError("size_mismatch", "The class map is not the same size as the image.")
    return arr


def _normalize(after: np.ndarray, before: np.ndarray, valid: np.ndarray) -> tuple[np.ndarray, list[dict]]:
    """Match the later image's brightness and contrast to the earlier one using pixels that look unchanged."""
    ref = valid.copy()
    gains: list[tuple[float, float]] = [(1.0, 0.0)] * 3
    out = after.copy()
    for _ in range(2):
        diff = np.abs(out - before).mean(axis=2)
        if valid.sum() < 50:
            break
        ref = valid & (diff <= np.percentile(diff[valid], 70))
        if ref.sum() < 50:
            break
        gains = []
        for c in range(3):
            a, b = after[..., c][ref], before[..., c][ref]
            gain = float(b.std() / a.std()) if a.std() > 1e-3 else 1.0
            gain = float(np.clip(gain, 0.5, 2.0))
            offset = float(b.mean() - gain * a.mean())
            gains.append((gain, offset))
            out[..., c] = np.clip(after[..., c] * gain + offset, 0, 255)
    return out, [{"gain": round(g, 3), "offset": round(o, 2)} for g, o in gains]


def analyze_change(
    before_path: Path, after_path: Path, overlay_path: Path,
    before_scl: Path | None = None, after_scl: Path | None = None, pixel_m: float = 10.0,
) -> dict:
    before, after = _load_rgb(before_path), _load_rgb(after_path)
    if before.shape != after.shape:
        raise ChangeError("size_mismatch", "The two images must be the same size and cover the same ground.")
    h, w, _ = before.shape

    valid = (before.max(axis=2) > 0) & (after.max(axis=2) > 0)
    scl_used = before_scl is not None and after_scl is not None
    cloud_fraction = None
    sb = sa = None
    if scl_used:
        sb, sa = _load_labels(before_scl, (h, w)), _load_labels(after_scl, (h, w))
        cloud = np.isin(sb, CLOUD_CLASSES) | np.isin(sa, CLOUD_CLASSES)
        cloud_fraction = float(cloud.mean())
        valid &= ~cloud

    warnings: list[str] = []
    valid_fraction = float(valid.mean())
    base = {"width_px": w, "height_px": h, "pixel_m": pixel_m, "scl_used": scl_used, "valid_fraction": round(valid_fraction, 4), "cloud_masked_fraction": None if cloud_fraction is None else round(cloud_fraction, 4)}
    if not scl_used:
        warnings.append("No scene classification layer was available, so clouds and shadows were not masked. Clouds can look like change.")
    if valid_fraction < MIN_VALID_FRACTION:
        return {**base, "status": "insufficient_data", "warnings": warnings + [f"Only {valid_fraction:.0%} of the area has usable pixels in both images (the rest is cloud, shadow or no data), which is too little to measure change."], "overlay": None}
    if valid_fraction < WARN_VALID_FRACTION:
        warnings.append(f"Only {valid_fraction:.0%} of the area is usable in both images; results cover that part only.")

    normalized, gains = _normalize(after, before, valid)
    raw = np.sqrt(((normalized - before) ** 2).sum(axis=2))
    weight = valid.astype(np.float32)
    num = ndimage.gaussian_filter(np.where(valid, raw, 0.0), sigma=1.0)
    den = ndimage.gaussian_filter(weight, sigma=1.0)
    mag = np.where(den > 1e-3, num / np.maximum(den, 1e-3), 0.0)
    vals = mag[valid]
    med = float(np.median(vals))
    mad = float(np.median(np.abs(vals - med)) * 1.4826)
    threshold = max(MIN_THRESHOLD, med + K_MAD * max(mad, 1e-6))

    mask = valid & (mag > threshold)
    labels, n = ndimage.label(mask, structure=np.ones((3, 3), dtype=int))
    if n:
        sizes = ndimage.sum(mask, labels, index=np.arange(1, n + 1))
        keep = np.zeros(n + 1, dtype=bool)
        keep[1:] = sizes >= MIN_COMPONENT_PX
        mask = keep[labels]
        labels, n = ndimage.label(mask, structure=np.ones((3, 3), dtype=int))

    px_ha = pixel_m * pixel_m / 10_000.0
    changed_px, valid_px = int(mask.sum()), int(valid.sum())
    changed_fraction = changed_px / valid_px if valid_px else 0.0
    if changed_fraction > 0.5:
        warnings.append("More than half of the usable area is flagged. That usually means a lighting, seasonal or haze difference, not real change.")

    components = []
    if n:
        objs = ndimage.find_objects(labels)
        sizes = ndimage.sum(mask, labels, index=np.arange(1, n + 1))
        for i in np.argsort(-sizes)[:5]:
            sl = objs[int(i)]
            components.append({"area_ha": round(float(sizes[i]) * px_ha, 3), "bbox_px": [int(sl[1].start), int(sl[0].start), int(sl[1].stop), int(sl[0].stop)]})

    transitions: list[dict] = []
    same_class_ha = None
    if scl_used and changed_px:
        pairs = np.stack([sb[mask], sa[mask]], axis=1)
        keys, counts = np.unique(pairs, axis=0, return_counts=True)
        same = sum(int(c) for k, c in zip(keys, counts) if k[0] == k[1])
        same_class_ha = round(same * px_ha, 3)
        diff = [(k, int(c)) for k, c in zip(keys, counts) if k[0] != k[1]]
        for k, c in sorted(diff, key=lambda x: -x[1])[:6]:
            transitions.append({"from": SCL_NAMES.get(int(k[0]), str(int(k[0]))), "to": SCL_NAMES.get(int(k[1]), str(int(k[1]))), "area_ha": round(c * px_ha, 3)})

    overlay = np.zeros((h, w, 4), np.uint8)
    overlay[mask] = OVERLAY_RGBA
    save_png_atomic(Image.fromarray(overlay, "RGBA"), overlay_path)

    return {
        **base,
        "status": "ok",
        "threshold": round(threshold, 2),
        "normalization": gains,
        "changed_pixels": changed_px,
        "changed_fraction": round(changed_fraction, 4),
        "changed_area_ha": round(changed_px * px_ha, 3),
        "valid_area_ha": round(valid_px * px_ha, 3),
        "components": components,
        "component_count": int(n),
        "transitions": transitions,
        "changed_within_same_class_ha": same_class_ha,
        "warnings": warnings,
        "overlay": {"width_px": w, "height_px": h},
    }
