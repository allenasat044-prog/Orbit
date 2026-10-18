from __future__ import annotations

import hashlib
import os
import tempfile
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image
from rasterio.warp import transform
from rasterio.windows import Window

MAX_NODATA_FRACTION = 0.5


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


def extract_chip(src_path: Path, out_path: Path, lon: float, lat: float, size_px: int) -> dict:
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

        w, h = min(size_px, ds.width), min(size_px, ds.height)
        c0 = min(max(col - w // 2, 0), ds.width - w)
        r0 = min(max(row - h // 2, 0), ds.height - h)
        window = Window(c0, r0, w, h)
        data = ds.read([1, 2, 3], window=window)

        nodata_fraction = float(np.mean(np.all(data == 0, axis=0)))
        if nodata_fraction > MAX_NODATA_FRACTION:
            raise RasterError("chip_mostly_empty", f"{nodata_fraction:.0%} of this area has no data (scene edge).")

        left, bottom, right, top = ds.window_bounds(window)
        cx, cy = transform(ds.crs, "EPSG:4326", [left, right, right, left], [top, top, bottom, bottom])
        ring = [[cx[i], cy[i]] for i in range(4)]
        ring.append(ring[0])

        gsd = None
        if ds.crs.is_projected and str(ds.crs.linear_units).lower() in ("metre", "meter"):
            gsd = float(ds.res[0])
        crs = ds.crs.to_string()

    img = Image.fromarray(np.transpose(data, (1, 2, 0)), "RGB")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=out_path.parent, suffix=".png.tmp")
    os.close(fd)
    try:
        img.save(tmp, "PNG")
        os.replace(tmp, out_path)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)

    return {
        "width_px": int(w),
        "height_px": int(h),
        "pin_px": {"x": int(col - c0), "y": int(row - r0)},
        "gsd_m": gsd,
        "crs": crs,
        "nodata_fraction": nodata_fraction,
        "bounds": {"type": "Polygon", "coordinates": [ring]},
        "sha256": hashlib.sha256(out_path.read_bytes()).hexdigest(),
    }
