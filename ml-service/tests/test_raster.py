import numpy as np
import pytest
import rasterio
from fastapi.testclient import TestClient
from PIL import Image
from rasterio.transform import from_origin
from rasterio.warp import transform

from app.main import app
from app.raster import RasterError, extract_chip, raster_support

client = TestClient(app)
CRS = "EPSG:32650"
X0, Y0, RES = 500000.0, 7500000.0, 10.0


def make_tci(path, w=1200, h=1000, blank_cols=0, driver="JP2OpenJPEG"):
    data = np.zeros((3, h, w), np.uint8)
    data[0] = np.tile(np.linspace(20, 250, w, dtype=np.uint8), (h, 1))
    data[1] = np.tile(np.linspace(20, 250, h, dtype=np.uint8)[:, None], (1, w))
    data[2] = 90
    if blank_cols:
        data[:, :, :blank_cols] = 0
    with rasterio.open(path, "w", driver=driver, width=w, height=h, count=3, dtype="uint8", crs=CRS, transform=from_origin(X0, Y0, RES, RES)) as dst:
        dst.write(data)


def lonlat_of(col, row):
    x, y = X0 + (col + 0.5) * RES, Y0 - (row + 0.5) * RES
    lon, lat = transform(CRS, "EPSG:4326", [x], [y])
    return lon[0], lat[0]


@pytest.fixture
def storage(tmp_path, monkeypatch):
    monkeypatch.setenv("STORAGE_DIR", str(tmp_path))
    return tmp_path


def test_jp2_support_is_reported():
    assert raster_support()["jp2"] is True


def test_chip_is_centered_on_the_pin_and_georeferenced(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(600, 500)
    r = extract_chip(src, storage / "chips" / "a.png", lon, lat, 256)
    assert (r["width_px"], r["height_px"]) == (256, 256)
    assert r["pin_px"] == {"x": 128, "y": 128}
    assert r["gsd_m"] == 10.0
    assert r["crs"] == CRS
    assert r["nodata_fraction"] == 0
    img = Image.open(storage / "chips" / "a.png")
    assert img.size == (256, 256) and img.mode == "RGB"
    ring = r["bounds"]["coordinates"][0]
    assert len(ring) == 5 and ring[0] == ring[-1]
    xs = [p[0] for p in ring[:4]]
    assert min(xs) < lon < max(xs)
    assert len(r["sha256"]) == 64


def test_chip_window_is_shifted_at_the_scene_edge_and_pin_moves(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(10, 10)
    r = extract_chip(src, storage / "b.png", lon, lat, 256)
    assert (r["width_px"], r["height_px"]) == (256, 256)
    assert r["pin_px"] == {"x": 10, "y": 10}


def test_chip_shrinks_when_the_scene_is_smaller_than_requested(storage):
    src = storage / "small.jp2"
    make_tci(src, w=100, h=80)
    lon, lat = lonlat_of(50, 40)
    r = extract_chip(src, storage / "c.png", lon, lat, 512)
    assert (r["width_px"], r["height_px"]) == (100, 80)


def test_point_outside_the_raster_is_rejected(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(5000, 5000)
    with pytest.raises(RasterError) as e:
        extract_chip(src, storage / "d.png", lon, lat, 256)
    assert e.value.code == "point_outside_raster"


def test_mostly_empty_chip_is_rejected_and_nothing_is_written(storage):
    src = storage / "edge.jp2"
    make_tci(src, blank_cols=700)
    lon, lat = lonlat_of(100, 500)
    with pytest.raises(RasterError) as e:
        extract_chip(src, storage / "e.png", lon, lat, 256)
    assert e.value.code == "chip_mostly_empty"
    assert not (storage / "e.png").exists()


def test_non_rgb_and_missing_files_are_rejected(storage):
    gray = storage / "gray.tif"
    with rasterio.open(gray, "w", driver="GTiff", width=10, height=10, count=1, dtype="uint8", crs=CRS, transform=from_origin(X0, Y0, RES, RES)) as dst:
        dst.write(np.ones((1, 10, 10), np.uint8))
    lon, lat = lonlat_of(5, 5)
    with pytest.raises(RasterError) as e:
        extract_chip(gray, storage / "f.png", lon, lat, 64)
    assert e.value.code == "unsupported_raster"
    with pytest.raises(RasterError) as e2:
        extract_chip(storage / "nope.jp2", storage / "g.png", lon, lat, 64)
    assert e2.value.code == "raster_not_found"


def test_api_chips_a_file_inside_storage_and_blocks_path_traversal(storage):
    make_tci(storage / "scene.jp2")
    lon, lat = lonlat_of(600, 500)
    ok = client.post("/raster/chip", json={"path": "scene.jp2", "out_path": "chips/x.png", "lon": lon, "lat": lat, "size_px": 128})
    assert ok.status_code == 200
    assert (storage / "chips" / "x.png").exists()
    bad = client.post("/raster/chip", json={"path": "../../etc/passwd", "out_path": "chips/y.png", "lon": lon, "lat": lat})
    assert bad.status_code == 400
    assert bad.json()["error"]["code"] == "invalid_path"
    bad2 = client.post("/raster/chip", json={"path": "scene.jp2", "out_path": "/tmp/evil.png", "lon": lon, "lat": lat})
    assert bad2.status_code == 400
    outside = client.post("/raster/chip", json={"path": "scene.jp2", "out_path": "chips/z.png", "lon": 0, "lat": 0})
    assert outside.status_code == 422
    assert outside.json()["error"]["code"] == "point_outside_raster"


def test_health_reports_raster_support():
    body = client.get("/health").json()
    assert body["raster"]["jp2"] is True
