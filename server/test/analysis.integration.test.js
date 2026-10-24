import test from "node:test";
import assert from "node:assert/strict";
import { createPool } from "../src/db.js";
import { runMigrations } from "../src/migrate.js";
import { createAcquisitionsRepo } from "../src/imagery/repo.js";
import { createAssetsRepo, createChipsRepo } from "../src/imagery/chipRepo.js";
import { createAnalysesRepo } from "../src/analysis/repo.js";
import { normalizeItem } from "../src/providers/copernicus.js";

const url = process.env.TEST_DATABASE_URL;

test("change analyses repo against a real PostGIS database", { skip: !url && "set TEST_DATABASE_URL to run" }, async () => {
  const pool = createPool(url, process.env.TEST_DATABASE_SSL === "true");
  const sceneIds = [];
  try {
    await runMigrations(pool);
    const acquisitions = createAcquisitionsRepo(pool);
    const assets = createAssetsRepo(pool);
    const chips = createChipsRepo(pool);
    const make = async (suffix, date) => {
      const { record } = await acquisitions.upsert(normalizeItem({
        id: `ANTEST_${suffix}_${Date.now()}`, collection: "sentinel-2-l2a", bbox: [0, 0, 1, 1],
        geometry: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] },
        assets: { TCI_10m: { href: "s3://x", roles: ["visual"], gsd: 10 } }, properties: { datetime: date, platform: "sentinel-2b", "eo:cloud_cover": 4 },
      }));
      sceneIds.push(record.id);
      const asset = await assets.insert({ acquisition_id: record.id, asset_key: "TCI_10m", storage_path: "a.jp2", sha256: "aa", size_bytes: 1 });
      const { chip } = await chips.insert({
        id: crypto.randomUUID(), acquisition_id: record.id, asset_id: asset.id, center_key: `an-${suffix}-${Date.now()}`, center_lon: 0.5, center_lat: 0.5, size_px: 256,
        width_px: 256, height_px: 256, pin_x: 128, pin_y: 128, gsd_m: 10, crs: "EPSG:32650", nodata_fraction: 0,
        bounds: { type: "Polygon", coordinates: [[[0.4, 0.6], [0.6, 0.6], [0.6, 0.4], [0.4, 0.4], [0.4, 0.6]]] }, storage_path: `chips/${suffix}.png`, sha256: "bb",
      });
      return chip;
    };
    const before = await make("b", "2026-03-10T05:00:00Z");
    const after = await make("a", "2026-09-12T05:00:00Z");
    const repo = createAnalysesRepo(pool);
    const input = { before_chip_id: before.id, after_chip_id: after.id, status: "ok", scl_used: true, results: { changed_area_ha: 4.8, transitions: [{ from: "vegetation", to: "not vegetated", area_ha: 4 }] }, notes: ["n1"], overlay_path: "analysis/x.png", created_by: null };
    const a = await repo.insert(input);
    const b = await repo.insert({ ...input, results: { changed_area_ha: 99 } });
    assert.equal(a.created, true);
    assert.equal(b.created, false);
    assert.equal(b.analysis.id, a.analysis.id);
    assert.equal(b.analysis.results.changed_area_ha, 4.8);
    const got = await repo.findById(a.analysis.id);
    assert.equal(got.before_platform, "sentinel-2b");
    assert.equal(got.size_px, 256);
    assert.equal(got.bounds.type, "Polygon");
    assert.equal(new Date(got.before_acquired_at).toISOString(), "2026-03-10T05:00:00.000Z");
    assert.equal(got.before_cloud, 4);
    assert.deepEqual(got.notes, ["n1"]);
    assert.equal((await repo.findByChips(before.id, after.id)).id, a.analysis.id);
    assert.equal(await repo.findByChips(after.id, before.id), null);
    const none = await repo.insert({ before_chip_id: after.id, after_chip_id: before.id, status: "insufficient_data", scl_used: false, results: {}, notes: [], overlay_path: null });
    assert.equal(none.analysis.status, "insufficient_data");
    assert.equal(none.analysis.overlay_path, null);
  } finally {
    if (sceneIds.length) await pool.query("delete from acquisitions where id = any($1)", [sceneIds]);
    await pool.end();
  }
});
