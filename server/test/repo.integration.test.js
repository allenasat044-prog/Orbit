import test from "node:test";
import assert from "node:assert/strict";
import { createPool } from "../src/db.js";
import { runMigrations } from "../src/migrate.js";
import { createAcquisitionsRepo } from "../src/imagery/repo.js";
import { normalizeItem } from "../src/providers/copernicus.js";

const url = process.env.TEST_DATABASE_URL;

test("acquisitions repo against a real PostGIS database", { skip: !url && "set TEST_DATABASE_URL to run" }, async () => {
  const pool = createPool(url, process.env.TEST_DATABASE_SSL === "true");
  try {
    await runMigrations(pool);
    const repo = createAcquisitionsRepo(pool);
    const id = `TEST_${Date.now()}`;
    const rec = normalizeItem({
      id, collection: "sentinel-2-l2a", bbox: [0, 0, 1, 1],
      geometry: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] },
      links: [{ rel: "self", href: "https://example/self" }],
      assets: { TCI_10m: { href: "s3://x", roles: ["visual"], gsd: 10 } },
      properties: { datetime: "2026-10-17T04:27:49Z", platform: "sentinel-2b", "eo:cloud_cover": 3.5, gsd: 10, instruments: ["msi"] },
    });
    const a = await repo.upsert(rec, null);
    const b = await repo.upsert(rec, null);
    assert.equal(a.created, true);
    assert.equal(b.created, false);
    assert.equal(a.record.id, b.record.id);
    assert.equal(a.record.footprint.type, "Polygon");
    assert.equal(a.record.visual_asset_key, "TCI_10m");
    assert.equal(a.record.cloud_cover, 3.5);
    assert.equal(new Date(a.record.acquired_at).toISOString(), "2026-10-17T04:27:49.000Z");
    const map = await repo.findExistingIds("copernicus", [id, "other"]);
    assert.equal(map.get(id), a.record.id);
    assert.equal(map.has("other"), false);
    await pool.query("delete from acquisitions where external_id = $1", [id]);
  } finally {
    await pool.end();
  }
});
