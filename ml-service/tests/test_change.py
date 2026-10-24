import numpy as np
import pytest
import rasterio
from fastapi.testclient import TestClient
from PIL import Image
from rasterio.transform import from_origin
from rasterio.warp import transform

from app.change import ChangeError, analyze_change
from app.main import app
from app.raster import RasterError, extract_label_chip

client = TestClient(app)
N = 128


@pytest.fixture
def storage(tmp_path, monkeypatch):
    monkeypatch.setenv("STORAGE_DIR", str(tmp_path))
    return tmp_path


def scene(seed=1):
    rng = np.random.default_rng(seed)
    base = np.zeros((N, N, 3), np.float32)
    base[..., 0], base[..., 1], base[..., 2] = 80, 120, 70
    base[:, N // 2:, :] += (30, -10, 20)
    base += rng.normal(0, 4, base.shape)
    return base


def save(arr, path):
    Image.fromarray(np.clip(arr, 1, 255).astype(np.uint8), "RGB").save(path)
    return path


def save_labels(arr, path):
    Image.fromarray(arr.astype(np.uint8), "L").save(path)
    return path


def pair(storage, mutate=None, noise=2.0, seed=1):
    b = scene(seed)
    a = b + np.random.default_rng(seed + 100).normal(0, noise, b.shape)
    if mutate:
        a = mutate(a)
    return save(b, storage / "b.png"), save(a, storage / "a.png"), storage / "overlay.png"


def overlay_alpha(path):
    return np.asarray(Image.open(path))[..., 3]


def test_identical_scenes_show_no_change(storage):
    b, a, o = pair(storage)
    r = analyze_change(b, a, o)
    assert r["status"] == "ok" and r["changed_pixels"] <= 5
    assert r["changed_fraction"] < 0.001
    assert overlay_alpha(o).max() == 0 or (overlay_alpha(o) > 0).sum() <= 5


def test_a_new_bright_block_is_found_with_a_sensible_area_and_location(storage):
    def add(a):
        a[40:60, 30:50] = (210, 200, 190)
        return a

    b, a, o = pair(storage, add)
    r = analyze_change(b, a, o)
    assert r["status"] == "ok"
    assert 320 <= r["changed_pixels"] <= 520
    assert 3.2 <= r["changed_area_ha"] <= 5.2
    x0, y0, x1, y1 = r["components"][0]["bbox_px"]
    assert x0 <= 32 and y0 <= 42 and x1 >= 48 and y1 >= 58
    alpha = overlay_alpha(o)
    assert alpha[50, 40] == 150 and alpha[5, 5] == 0
    assert any("scene classification layer" in w for w in r["warnings"])


def test_a_global_brightness_and_contrast_shift_is_not_reported_as_change(storage):
    b, a, o = pair(storage, lambda a: a * 0.8 + 25)
    r = analyze_change(b, a, o)
    assert r["status"] == "ok"
    assert r["changed_fraction"] < 0.02
    assert all(0.5 <= n["gain"] <= 2.0 for n in r["normalization"])


def test_a_shift_plus_real_change_still_finds_only_the_real_change(storage):
    def mutate(a):
        a = a * 0.85 + 20
        a[10:30, 90:110] = (30, 40, 200)
        return a

    b, a, o = pair(storage, mutate)
    r = analyze_change(b, a, o)
    assert 3.0 <= r["changed_area_ha"] <= 5.5
    x0, y0, x1, y1 = r["components"][0]["bbox_px"]
    assert x0 >= 85 and x1 <= 115 and y0 >= 5 and y1 <= 35


def test_single_pixel_speckle_is_ignored(storage):
    def speck(a):
        a[64, 64] = (255, 255, 255)
        return a

    b, a, o = pair(storage, speck)
    assert analyze_change(b, a, o)["changed_pixels"] == 0


def test_cloud_in_the_class_map_is_masked_and_reported(storage):
    def mutate(a):
        a[10:40, 10:40] = (250, 250, 250)
        a[80:100, 70:90] = (200, 60, 50)
        return a

    b, a, o = pair(storage, mutate)
    before_scl = np.full((N, N), 4, np.uint8)
    after_scl = np.full((N, N), 4, np.uint8)
    after_scl[10:40, 10:40] = 9
    after_scl[80:100, 70:90] = 5
    r_no = analyze_change(b, a, o)
    r = analyze_change(b, a, storage / "o2.png", save_labels(before_scl, storage / "sb.png"), save_labels(after_scl, storage / "sa.png"))
    assert r["scl_used"] is True and 0.05 < r["cloud_masked_fraction"] < 0.07
    assert r["changed_area_ha"] < r_no["changed_area_ha"] - 6
    assert 3.2 <= r["changed_area_ha"] <= 5.2
    assert overlay_alpha(storage / "o2.png")[25, 25] == 0 and overlay_alpha(storage / "o2.png")[90, 80] == 150
    assert r["transitions"][0]["from"] == "vegetation" and r["transitions"][0]["to"] == "not vegetated"
    assert r["transitions"][0]["area_ha"] == pytest.approx(4.0, rel=0.1)
    assert 0 < r["changed_within_same_class_ha"] < 1.5
    assert not any("scene classification layer" in w for w in r["warnings"])


def test_too_little_usable_data_is_refused_honestly_and_writes_nothing(storage):
    b, a, o = pair(storage)
    scl = np.full((N, N), 4, np.uint8)
    scl[:, : int(N * 0.8)] = 9
    r = analyze_change(b, a, o, save_labels(scl, storage / "sb.png"), save_labels(np.full((N, N), 4, np.uint8), storage / "sa.png"))
    assert r["status"] == "insufficient_data" and r["overlay"] is None
    assert "too little" in r["warnings"][-1]
    assert not o.exists()


def test_a_scene_that_is_completely_different_triggers_the_warning(storage):
    b = save(scene(1), storage / "b.png")
    a = save(np.random.default_rng(9).uniform(0, 255, (N, N, 3)), storage / "a.png")
    r = analyze_change(b, a, storage / "o.png")
    assert any("More than half" in w for w in r["warnings"]) or r["changed_fraction"] <= 0.5


def test_errors_for_size_mismatch_and_missing_files(storage):
    b = save(scene(1), storage / "b.png")
    small = save(scene(1)[:64, :64], storage / "s.png")
    with pytest.raises(ChangeError) as e:
        analyze_change(b, small, storage / "o.png")
    assert e.value.code == "size_mismatch"
    with pytest.raises(ChangeError) as e2:
        analyze_change(b, storage / "nope.png", storage / "o.png")
    assert e2.value.code == "image_not_found"
    wrong = save_labels(np.zeros((32, 32)), storage / "wrong.png")
    with pytest.raises(ChangeError) as e3:
        analyze_change(b, b, storage / "o.png", wrong, wrong)
    assert e3.value.code == "size_mismatch"


def test_change_endpoint_works_and_validates_paths_and_pairs(storage):
    def add(a):
        a[40:60, 30:50] = (210, 200, 190)
        return a

    pair(storage, add)
    r = client.post("/change/analyze", json={"before_path": "b.png", "after_path": "a.png", "overlay_out_path": "analysis/o.png"})
    assert r.status_code == 200 and r.json()["status"] == "ok" and (storage / "analysis" / "o.png").exists()
    assert client.post("/change/analyze", json={"before_path": "../../etc/passwd", "after_path": "a.png", "overlay_out_path": "o.png"}).status_code == 400
    assert client.post("/change/analyze", json={"before_path": "b.png", "after_path": "a.png", "overlay_out_path": "/tmp/evil.png"}).status_code == 400
    one = client.post("/change/analyze", json={"before_path": "b.png", "after_path": "a.png", "overlay_out_path": "o.png", "before_scl_path": "b.png"})
    assert one.status_code == 422
    assert client.post("/change/analyze", json={"before_path": "b.png", "after_path": "missing.png", "overlay_out_path": "o.png"}).status_code == 404


# ---------- class-map chips ----------
CRS = "EPSG:32650"
X0, Y0 = 500000.0, 7500000.0


def make_scl(path, res=20.0, w=600, h=500):
    data = np.full((h, w), 4, np.uint8)
    data[240:260, 290:310] = 9
    with rasterio.open(path, "w", driver="JP2OpenJPEG", width=w, height=h, count=1, dtype="uint8", crs=CRS, transform=from_origin(X0, Y0, res, res), QUALITY="100", REVERSIBLE="YES") as dst:
        dst.write(data, 1)


def lonlat_of(col, row, res=20.0):
    x, y = X0 + (col + 0.5) * res, Y0 - (row + 0.5) * res
    lon, lat = transform(CRS, "EPSG:4326", [x], [y])
    return lon[0], lat[0]


def test_label_chip_keeps_classes_exact_and_centres_them_on_the_pin(storage):
    src = storage / "scl.jp2"
    make_scl(src)
    lon, lat = lonlat_of(300, 250)
    r = extract_label_chip(src, storage / "scl.png", lon, lat, 128, pixel_m=10.0)
    arr = np.asarray(Image.open(storage / "scl.png"))
    assert arr.shape == (128, 128) and set(r["classes"]) <= {"4", "9"}
    ys, xs = np.where(arr == 9)
    assert abs(xs.mean() - 64) < 3 and abs(ys.mean() - 64) < 3
    assert 1500 < len(xs) < 1700


def test_label_chip_endpoint_and_errors(storage):
    make_scl(storage / "scl.jp2")
    lon, lat = lonlat_of(300, 250)
    ok = client.post("/raster/label-chip", json={"path": "scl.jp2", "out_path": "chips/x.scl.png", "lon": lon, "lat": lat, "size_px": 128})
    assert ok.status_code == 200 and (storage / "chips" / "x.scl.png").exists()
    far = client.post("/raster/label-chip", json={"path": "scl.jp2", "out_path": "chips/y.png", "lon": 0, "lat": 0})
    assert far.status_code == 422 and far.json()["error"]["code"] == "point_outside_raster"
    assert client.post("/raster/label-chip", json={"path": "../x", "out_path": "y.png", "lon": lon, "lat": lat}).status_code == 400
    rgb = storage / "rgb.tif"
    with rasterio.open(rgb, "w", driver="GTiff", width=10, height=10, count=3, dtype="uint16", crs=CRS, transform=from_origin(X0, Y0, 20, 20)) as d:
        d.write(np.ones((3, 10, 10), np.uint16))
    with pytest.raises(RasterError) as e:
        extract_label_chip(rgb, storage / "z.png", *lonlat_of(5, 5), 64)
    assert e.value.code == "unsupported_raster"
