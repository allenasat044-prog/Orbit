import test from "node:test";
import assert from "node:assert/strict";
import { createPool } from "../src/db.js";
import { runMigrations } from "../src/migrate.js";
import { createAcquisitionsRepo } from "../src/imagery/repo.js";
import { createAssetsRepo, createChipsRepo } from "../src/imagery/chipRepo.js";
import { createComparisonsRepo } from "../src/comparisons/repo.js";
import { normalizeItem } from "../src/providers/copernicus.js";

const url = process.env.TEST_DATABASE_URL;

test("comparisons repo against a real PostGIS database", { skip: !url && "set TEST_DATABASE_URL to run" }, async () => {
  const pool = createPool(url, process.env.TEST_DATABASE_SSL === "true");
  try {
    await runMigrations(pool);
    const { record: acq } = await createAcquisitionsRepo(pool).upsert(normalizeItem({
      id: `CMPTEST_${Date.now()}`, collection: "sentinel-2-l2a", bbox: [0, 0, 1, 1],
      geometry: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] },
      assets: { TCI_10m: { href: "s3://x", roles: ["visual"], gsd: 10 } }, properties: { datetime: "2026-10-17T04:27:49Z" },
    }));
    const asset = await createAssetsRepo(pool).insert({ acquisition_id: acq.id, asset_key: "TCI_10m", storage_path: "a.jp2", sha256: "aa", size_bytes: 1 });
    const { chip } = await createChipsRepo(pool).insert({
      id: crypto.randomUUID(), acquisition_id: acq.id, asset_id: asset.id, center_key: `c${Date.now()}`, center_lon: 0.5, center_lat: 0.5, size_px: 128,
      width_px: 128, height_px: 128, pin_x: 64, pin_y: 64, gsd_m: 10, crs: "EPSG:32650", nodata_fraction: 0,
      bounds: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, storage_path: "chips/x.png", sha256: "bb",
    });
    const repo = createComparisonsRepo(pool);
    const saved = await repo.insert({
      chip_id: chip.id,
      results: [{ model_id: "m", text: "Fields.", alignment: 0.31 }, { model_id: "n", error: { code: "x", message: "y" } }],
      scene_tags: [{ label: "farmland", score: 0.6 }], scene_model: { id: "g" }, scene_error: null, unavailable: [{ model_id: "u", reason: "r" }],
    });
    const got = await repo.findById(saved.id);
    assert.equal(got.results[0].alignment, 0.31);
    assert.equal(got.results[1].error.code, "x");
    assert.deepEqual(got.scene_tags, [{ label: "farmland", score: 0.6 }]);
    assert.equal(got.scene_error, null);
    assert.deepEqual(got.unavailable, [{ model_id: "u", reason: "r" }]);
    const none = await repo.insert({ chip_id: chip.id, results: [], scene_tags: null, scene_model: null, scene_error: { code: "model_unavailable", message: "m" } });
    assert.equal((await repo.findById(none.id)).scene_tags, null);
    await pool.query("delete from acquisitions where id = $1", [acq.id]);
    assert.equal(await repo.findById(saved.id), null);
  } finally {
    await pool.end();
  }
});
