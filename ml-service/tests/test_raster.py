import numpy as np
import pytest
import rasterio
from fastapi.testclient import TestClient
from PIL import Image
from rasterio.transform import from_origin
from rasterio.warp import transform

from app.main import app
from app.raster import RasterError, extract_chip, make_display, meters_per_degree, raster_support

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


def test_chip_is_north_up_centred_on_the_pin_and_metrically_square(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(600, 500)
    r = extract_chip(src, storage / "chips" / "a.png", lon, lat, 256)
    assert (r["width_px"], r["height_px"]) == (256, 256)
    assert r["pin_px"] == {"x": 128, "y": 128}
    assert r["gsd_m"] == 10.0
    assert r["crs"] == CRS
    ring = r["bounds"]["coordinates"][0]
    west, north = ring[0]
    east, south = ring[2]
    assert ring[0] == ring[-1] and west < east and south < north
    assert abs((west + east) / 2 - lon) < 1e-9 and abs((north + south) / 2 - lat) < 1e-9
    per_lat, per_lon = meters_per_degree(lat)
    assert abs((east - west) * per_lon - 2560) < 30
    assert abs((north - south) * per_lat - 2560) < 30
    img = Image.open(storage / "chips" / "a.png")
    assert img.size == (256, 256) and img.mode == "RGB"
    assert len(r["sha256"]) == 64


def test_a_marker_at_the_pin_lands_in_the_centre_of_the_chip_despite_grid_rotation(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    with rasterio.open(src, "r+") as ds:
        pass
    data = np.zeros((3, 1000, 1200), np.uint8)
    data[:] = 40
    data[:, 496:505, 596:605] = 255
    with rasterio.open(src, "w", driver="JP2OpenJPEG", width=1200, height=1000, count=3, dtype="uint8", crs=CRS, transform=from_origin(X0, Y0, RES, RES), QUALITY="100", REVERSIBLE="YES") as dst:
        dst.write(data)
    lon, lat = lonlat_of(600, 500)
    extract_chip(src, storage / "m.png", lon, lat, 128)
    arr = np.array(Image.open(storage / "m.png"))[:, :, 0]
    ys, xs = np.where(arr > 200)
    assert len(xs) > 0
    assert abs(xs.mean() - 64) < 2.5 and abs(ys.mean() - 64) < 2.5


def test_pixel_values_come_from_the_right_place_in_the_scene(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(800, 300)
    r = extract_chip(src, storage / "v.png", lon, lat, 64)
    arr = np.array(Image.open(storage / "v.png"))
    with rasterio.open(src) as ds:
        expected = ds.read(1)[300, 800]
    assert abs(int(arr[32, 32, 0]) - int(expected)) <= 3
    assert r["nodata_fraction"] == 0


def test_chip_near_the_scene_edge_keeps_the_pin_centred_and_leaves_black_outside(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(100, 100)
    r = extract_chip(src, storage / "b.png", lon, lat, 256)
    assert r["pin_px"] == {"x": 128, "y": 128}
    assert 0.05 < r["nodata_fraction"] < 0.5
    arr = np.array(Image.open(storage / "b.png"))
    assert arr[0, 0].sum() == 0 and arr[200, 200].sum() > 0


def test_point_outside_the_raster_is_rejected(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(5000, 5000)
    with pytest.raises(RasterError) as e:
        extract_chip(src, storage / "d.png", lon, lat, 256)
    assert e.value.code == "point_outside_raster"


def test_mostly_empty_chips_are_rejected_and_nothing_is_written(storage):
    edge = storage / "edge.jp2"
    make_tci(edge, blank_cols=700)
    lon, lat = lonlat_of(100, 500)
    with pytest.raises(RasterError) as e:
        extract_chip(edge, storage / "e.png", lon, lat, 256)
    assert e.value.code == "chip_mostly_empty"
    assert not (storage / "e.png").exists()
    small = storage / "small.jp2"
    make_tci(small, w=100, h=80)
    lon, lat = lonlat_of(50, 40)
    with pytest.raises(RasterError) as e2:
        extract_chip(small, storage / "s.png", lon, lat, 512)
    assert e2.value.code == "chip_mostly_empty"


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


def _lapvar(im):
    g = np.asarray(im.convert("L"), np.float32)
    lap = g[1:-1, 1:-1] * 4 - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:]
    return float(lap.var())


def test_display_image_is_about_1024px_keeps_the_pin_centred_and_is_crisper_than_plain_bilinear(storage):
    src = storage / "scene.jp2"
    data = np.full((3, 1000, 1200), 60, np.uint8)
    data[:, 480:520, 580:620] = 220
    data[:, 505:515, :] = 130
    with rasterio.open(src, "w", driver="JP2OpenJPEG", width=1200, height=1000, count=3, dtype="uint8", crs=CRS, transform=from_origin(X0, Y0, RES, RES), QUALITY="100", REVERSIBLE="YES") as dst:
        dst.write(data)
    lon, lat = lonlat_of(600, 500)
    r = extract_chip(src, storage / "c.png", lon, lat, 128, storage / "c.display.png")
    assert r["display"] == {"width_px": 1024, "height_px": 1024, "scale": 8}
    native = Image.open(storage / "c.png")
    big = Image.open(storage / "c.display.png")
    assert native.size == (128, 128) and big.size == (1024, 1024) and big.mode == "RGB"
    arr = np.array(big)[:, :, 0]
    ys, xs = np.where(arr > 200)
    assert abs(xs.mean() - 512) < 40 and abs(ys.mean() - 512) < 40
    assert _lapvar(big) > 1.3 * _lapvar(native.resize((1024, 1024), Image.BILINEAR))
    assert np.array(big).min() >= 0 and np.array(big).max() <= 255


def test_display_scale_depends_on_chip_size_and_is_optional(storage):
    src = storage / "scene.jp2"
    make_tci(src)
    lon, lat = lonlat_of(600, 500)
    r256 = extract_chip(src, storage / "a.png", lon, lat, 256, storage / "a.display.png")
    r512 = extract_chip(src, storage / "b.png", lon, lat, 512, storage / "b.display.png")
    none = extract_chip(src, storage / "n.png", lon, lat, 128)
    assert (r256["display"]["scale"], r256["display"]["width_px"]) == (4, 1024)
    assert (r512["display"]["scale"], r512["display"]["width_px"]) == (2, 1024)
    assert none["display"] is None
    img, scale = make_display(Image.new("RGB", (1500, 1500)))
    assert scale == 1 and img.size == (1500, 1500)


def test_api_writes_the_display_image_and_blocks_paths_outside_storage(storage):
    make_tci(storage / "scene.jp2")
    lon, lat = lonlat_of(600, 500)
    body = {"path": "scene.jp2", "out_path": "chips/x.png", "display_out_path": "chips/x.display.png", "lon": lon, "lat": lat, "size_px": 128}
    ok = client.post("/raster/chip", json=body)
    assert ok.status_code == 200 and ok.json()["display"]["width_px"] == 1024
    assert (storage / "chips" / "x.display.png").exists()
    bad = client.post("/raster/chip", json={**body, "display_out_path": "../../tmp/evil.png"})
    assert bad.status_code == 400 and bad.json()["error"]["code"] == "invalid_path"
