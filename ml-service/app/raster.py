from __future__ import annotations

import hashlib
import math
import os
import tempfile
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image, ImageFilter
from rasterio.transform import from_origin
from rasterio.warp import Resampling, reproject, transform
from rasterio.windows import Window

MAX_NODATA_FRACTION = 0.5
DISPLAY_TARGET_PX = 1024


class RasterError(Exception):
    def __init__(self, code: str, message: str, status: int = 422) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.status = status


def storage_root() -> Path:
    return Path(os.environ.get("STORAGE_DIR", "../storage")).resolve()


def safe_path(rel: str) -> Path:
    root = storage_root()
    p = (root / rel).resolve()
    try:
        p.relative_to(root)
    except ValueError:
        raise RasterError("invalid_path", "Path is outside the storage directory.", 400)
    return p


def raster_support() -> dict:
    with rasterio.Env() as env:
        drivers = env.drivers()
    return {"rasterio": rasterio.__version__, "jp2": "JP2OpenJPEG" in drivers, "geotiff": "GTiff" in drivers}


def meters_per_degree(lat: float) -> tuple[float, float]:
    phi = math.radians(lat)
    per_lat = 111132.954 - 559.822 * math.cos(2 * phi) + 1.175 * math.cos(4 * phi)
    per_lon = 111412.84 * math.cos(phi) - 93.5 * math.cos(3 * phi) + 0.118 * math.cos(5 * phi)
    return per_lat, per_lon


def make_display(img: Image.Image) -> tuple[Image.Image, int]:
    """Smoothly enlarge a chip for viewing. This sharpens how it looks; it adds no real detail."""
    scale = max(1, round(DISPLAY_TARGET_PX / max(img.size)))
    if scale == 1:
        return img, 1
    big = img.resize((img.width * scale, img.height * scale), Image.LANCZOS)
    return big.filter(ImageFilter.UnsharpMask(radius=scale * 0.6, percent=70, threshold=1)), scale


def save_png_atomic(img: Image.Image, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=out_path.parent, suffix=".png.tmp")
    os.close(fd)
    try:
        img.save(tmp, "PNG")
        os.replace(tmp, out_path)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def extract_chip(src_path: Path, out_path: Path, lon: float, lat: float, size_px: int, display_out_path: Path | None = None) -> dict:
    """Cut a north-up image centred exactly on (lon, lat), resampled from the scene's own grid."""
    if not src_path.exists():
        raise RasterError("raster_not_found", "Source raster does not exist.", 404)
    try:
        ds = rasterio.open(src_path)
    except rasterio.errors.RasterioIOError as err:
        raise RasterError("unreadable_raster", f"Could not open raster: {err}")

    with ds:
        if ds.crs is None:
            raise RasterError("no_georeferencing", "Raster has no coordinate reference system.")
        if ds.count < 3 or ds.dtypes[0] != "uint8":
            raise RasterError("unsupported_raster", "Expected an 8-bit RGB raster (such as a true-colour image).")

        xs, ys = transform("EPSG:4326", ds.crs, [lon], [lat])
        row, col = ds.index(xs[0], ys[0])
        if not (0 <= row < ds.height and 0 <= col < ds.width):
            raise RasterError("point_outside_raster", "The pin is outside this raster.")

        metric = ds.crs.is_projected and str(ds.crs.linear_units).lower() in ("metre", "meter")
        if metric:
            per_lat, per_lon = meters_per_degree(lat)
            dlat, dlon = abs(ds.res[1]) / per_lat, abs(ds.res[0]) / per_lon
            gsd = float(ds.res[0])
        else:
            dlat, dlon, gsd = abs(ds.res[1]), abs(ds.res[0]), None

        west, north = lon - size_px / 2 * dlon, lat + size_px / 2 * dlat
        east, south = west + size_px * dlon, north - size_px * dlat
        dst_transform = from_origin(west, north, dlon, dlat)

        cx, cy = transform("EPSG:4326", ds.crs, [west, east, east, west], [north, north, south, south])
        corner_idx = [ds.index(x, y) for x, y in zip(cx, cy)]
        rows, cols = [i[0] for i in corner_idx], [i[1] for i in corner_idx]
        r0, r1 = max(min(rows) - 4, 0), min(max(rows) + 4, ds.height)
        c0, c1 = max(min(cols) - 4, 0), min(max(cols) + 4, ds.width)
        window = Window(c0, r0, c1 - c0, r1 - r0)
        data = ds.read([1, 2, 3], window=window)
        src_transform = ds.window_transform(window)
        src_crs = ds.crs
        crs = ds.crs.to_string()

    dest = np.zeros((3, size_px, size_px), np.uint8)
    for b in range(3):
        reproject(source=data[b], destination=dest[b], src_transform=src_transform, src_crs=src_crs, dst_transform=dst_transform, dst_crs="EPSG:4326", resampling=Resampling.cubic)

    valid = np.zeros((size_px, size_px), np.uint8)
    reproject(source=(data.max(axis=0) > 0).astype(np.uint8), destination=valid, src_transform=src_transform, src_crs=src_crs, dst_transform=dst_transform, dst_crs="EPSG:4326", resampling=Resampling.nearest)
    dest[:, valid == 0] = 0

    nodata_fraction = float(np.mean(valid == 0))
    if nodata_fraction > MAX_NODATA_FRACTION:
        raise RasterError("chip_mostly_empty", f"{nodata_fraction:.0%} of this area has no data (scene edge).")

    img = Image.fromarray(np.transpose(dest, (1, 2, 0)), "RGB")
    save_png_atomic(img, out_path)
    display = None
    if display_out_path is not None:
        big, scale = make_display(img)
        save_png_atomic(big, display_out_path)
        display = {"width_px": big.width, "height_px": big.height, "scale": scale}

    return {
        "width_px": int(size_px),
        "height_px": int(size_px),
        "pin_px": {"x": size_px // 2, "y": size_px // 2},
        "gsd_m": gsd,
        "crs": crs,
        "nodata_fraction": nodata_fraction,
        "bounds": {"type": "Polygon", "coordinates": [[[west, north], [east, north], [east, south], [west, south], [west, north]]]},
        "sha256": hashlib.sha256(out_path.read_bytes()).hexdigest(),
        "display": display,
    }
