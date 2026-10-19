import test from "node:test";
import assert from "node:assert/strict";
import { createPool } from "../src/db.js";
import { runMigrations } from "../src/migrate.js";
import { createAcquisitionsRepo } from "../src/imagery/repo.js";
import { createAssetsRepo, createChipsRepo } from "../src/imagery/chipRepo.js";
import { createCaptionsRepo, promptKey } from "../src/captions/repo.js";
import { normalizeItem } from "../src/providers/copernicus.js";

const url = process.env.TEST_DATABASE_URL;

test("captions repo against a real PostGIS database", { skip: !url && "set TEST_DATABASE_URL to run" }, async () => {
  const pool = createPool(url, process.env.TEST_DATABASE_SSL === "true");
  try {
    await runMigrations(pool);
    const { record: acq } = await createAcquisitionsRepo(pool).upsert(normalizeItem({
      id: `CAPTEST_${Date.now()}`, collection: "sentinel-2-l2a", bbox: [0, 0, 1, 1],
      geometry: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]] },
      assets: { TCI_10m: { href: "s3://x", roles: ["visual"], gsd: 10 } }, properties: { datetime: "2026-10-17T04:27:49Z" },
    }));
    const asset = await createAssetsRepo(pool).insert({ acquisition_id: acq.id, asset_key: "TCI_10m", storage_path: "a.jp2", sha256: "aa", size_bytes: 1 });
    const chips = createChipsRepo(pool);
    const { chip } = await chips.insert({
      id: crypto.randomUUID(), acquisition_id: acq.id, asset_id: asset.id, center_key: "0.5,0.5,128,v2", center_lon: 0.5, center_lat: 0.5, size_px: 128,
      width_px: 128, height_px: 128, pin_x: 64, pin_y: 64, gsd_m: 10, crs: "EPSG:32650", nodata_fraction: 0,
      bounds: { type: "Polygon", coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]] }, storage_path: "chips/x.png", sha256: "bb",
    });
    const repo = createCaptionsRepo(pool);
    const base = { chip_id: chip.id, acquisition_id: acq.id, model_id: "smolvlm-instruct", checkpoint: "HuggingFaceTB/SmolVLM-Instruct", revision: "abc", device: "mps", dtype: "bfloat16", prompt: "P", prompt_key: promptKey(null), caption: "Fields.", latency_ms: 900 };
    const a = await repo.insert(base);
    const b = await repo.insert({ ...base, caption: "Different text" });
    const other = await repo.insert({ ...base, model_id: "other-model" });
    assert.equal(a.created, true);
    assert.equal(b.created, false);
    assert.equal(b.caption.id, a.caption.id);
    assert.equal(b.caption.caption, "Fields.");
    assert.equal(other.created, true);
    assert.equal((await repo.find(chip.id, "smolvlm-instruct", "default")).revision, "abc");
    const u = (await pool.query("insert into users (name, email, password_hash) values ('T', $1, 'x'), ('U', $2, 'x') returning id", [`t${Date.now()}@x.io`, `u${Date.now()}@x.io`])).rows;
    const [me, them] = [u[0].id, u[1].id];
    for (const m of ["m1", "m2", "m3"]) await repo.insert({ ...base, model_id: m, created_by: me });
    await repo.insert({ ...base, model_id: "m4", created_by: them });
    const p1 = await repo.listForUser(me, { limit: 2 });
    assert.equal(p1.length, 2);
    assert.equal(p1[0].scene_id, acq.external_id);
    assert.equal(p1[0].center_lat, 0.5);
    assert.equal(p1[0].size_px, 128);
    const last = p1[1];
    const p2 = await repo.listForUser(me, { limit: 2, after: { t: last.created_at_raw, id: last.id } });
    const seen = [...p1, ...p2].map((r) => r.id);
    assert.equal(new Set(seen).size, seen.length);
    assert.equal(seen.length, 3);
    assert.ok([...p1, ...p2].every((r) => r.created_by === me));
    assert.ok(p1[0].created_at_raw >= p1[1].created_at_raw);
    assert.equal(await repo.remove(p1[0].id), true);
    assert.equal(await repo.remove(p1[0].id), false);
    await pool.query("delete from acquisitions where id = $1", [acq.id]);
    assert.equal(await repo.findById(a.caption.id), null);
    await pool.query("delete from users where id = any($1)", [[me, them]]);
  } finally {
    await pool.end();
  }
});
