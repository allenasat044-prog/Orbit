import test from "node:test";
import assert from "node:assert/strict";
import { createPool } from "../src/db.js";
import { runMigrations } from "../src/migrate.js";
import { createAcquisitionsRepo } from "../src/imagery/repo.js";
import { createAssetsRepo, createChipsRepo } from "../src/imagery/chipRepo.js";
import { createJobsRepo } from "../src/jobs/repo.js";
import { normalizeItem } from "../src/providers/copernicus.js";

const url = process.env.TEST_DATABASE_URL;

test("jobs, assets and chips repos against a real PostGIS database", { skip: !url && "set TEST_DATABASE_URL to run" }, async () => {
  const pool = createPool(url, process.env.TEST_DATABASE_SSL === "true");
  try {
    await runMigrations(pool);
    const acqs = createAcquisitionsRepo(pool);
    const assets = createAssetsRepo(pool);
    const chips = createChipsRepo(pool);
    const jobs = createJobsRepo(pool);

    const { record: acq } = await acqs.upsert(normalizeItem({
      id: `CHIPTEST_${Date.now()}`, collection: "sentinel-2-l2a", bbox: [0, 0, 1, 1],
      geometry: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] },
      assets: { TCI_10m: { href: "s3://x", roles: ["visual"], gsd: 10, type: "image/jp2" } },
      properties: { datetime: "2026-10-17T04:27:49Z" },
    }));

    const a1 = await assets.insert({ acquisition_id: acq.id, asset_key: "TCI_10m", storage_path: "assets/x.jp2", sha256: "aa", size_bytes: 123, content_type: "image/jp2" });
    const a2 = await assets.insert({ acquisition_id: acq.id, asset_key: "TCI_10m", storage_path: "assets/x.jp2", sha256: "aa", size_bytes: 123 });
    assert.equal(a1.id, a2.id);
    assert.equal(Number(a1.size_bytes), 123);
    assert.equal((await assets.find(acq.id, "TCI_10m")).id, a1.id);

    const chip = {
      id: crypto.randomUUID(), acquisition_id: acq.id, asset_id: a1.id, center_key: "0.50000,0.50000,512", center_lon: 0.5, center_lat: 0.5,
      size_px: 512, width_px: 512, height_px: 512, pin_x: 256, pin_y: 256, gsd_m: 10, crs: "EPSG:32650", nodata_fraction: 0,
      bounds: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, storage_path: "chips/x.png", sha256: "bb",
    };
    const c1 = await chips.insert(chip);
    const c2 = await chips.insert({ ...chip, id: crypto.randomUUID() });
    assert.equal(c1.created, true);
    assert.equal(c2.created, false);
    assert.equal(c2.chip.id, chip.id);
    assert.equal(c1.chip.bounds.type, "Polygon");
    assert.equal(c1.chip.pin_x, 256);
    assert.equal((await chips.findByKey(acq.id, chip.center_key)).id, chip.id);

    const j = await jobs.create({ type: "prepare_chip", params: { a: 1 }, userId: null });
    assert.equal(j.status, "queued");
    assert.equal((await jobs.markRunning(j.id)).attempts, 1);
    assert.equal((await jobs.requeue(j.id)).status, "queued");
    assert.equal((await jobs.markRunning(j.id)).attempts, 2);
    await jobs.recoverInterrupted();
    const failed = await jobs.get(j.id);
    assert.equal(failed.status, "failed");
    assert.equal(failed.error.code, "interrupted");
    const j2 = await jobs.create({ type: "prepare_chip", params: {}, userId: null });
    assert.ok((await jobs.listQueued()).some((r) => r.id === j2.id));
    assert.deepEqual((await jobs.markSucceeded(j2.id, { chip_id: "x" })).result, { chip_id: "x" });

    await pool.query("delete from acquisitions where id = $1", [acq.id]);
    assert.equal((await chips.findById(chip.id)), null);
    await pool.query("delete from jobs where id = any($1)", [[j.id, j2.id]]);
  } finally {
    await pool.end();
  }
});
