import test from "node:test";
import assert from "node:assert/strict";
import { createPool } from "../src/db.js";
import { runMigrations } from "../src/migrate.js";
import { createAcquisitionsRepo } from "../src/imagery/repo.js";
import { createRegionsRepo, RegionExistsError } from "../src/regions/repo.js";
import { createUpdateRunsRepo, RunInProgressError } from "../src/updates/repo.js";
import { createUpdateEngine } from "../src/updates/engine.js";
import { normalizeItem } from "../src/providers/copernicus.js";

const url = process.env.TEST_DATABASE_URL;
const stamp = Date.now();

const feature = (id, day) => ({
  id, collection: "sentinel-2-l2a", bbox: [77, 28, 78, 29],
  geometry: { type: "Polygon", coordinates: [[[77, 28], [78, 28], [78, 29], [77, 29], [77, 28]]] },
  assets: { TCI_10m: { href: "s3://x", roles: ["visual"], gsd: 10, type: "image/jp2" } },
  properties: { datetime: `2026-10-${day}T05:00:00Z`, platform: "sentinel-2c", "eo:cloud_cover": 5 },
});

test("regions, update runs and the engine against a real PostGIS database", { skip: !url && "set TEST_DATABASE_URL to run" }, async () => {
  const pool = createPool(url, process.env.TEST_DATABASE_SSL === "true");
  const ids = {};
  try {
    await runMigrations(pool);
    await pool.query("update update_runs set status = 'failed', finished_at = now() where status = 'running'");
    const users = (await pool.query("insert into users (name, email, password_hash) values ('A', $1, 'x'), ('B', $2, 'x') returning id", [`ra${stamp}@x.io`, `rb${stamp}@x.io`])).rows;
    const [a, b] = users.map((u) => u.id);
    ids.users = [a, b];

    const regions = createRegionsRepo(pool);
    const runs = createUpdateRunsRepo(pool);
    const acquisitions = createAcquisitionsRepo(pool);

    const r1 = await regions.create({ name: "Delhi", lat: 28.6, lon: 77.2, collection: "sentinel-2-l2a", max_cloud: 25, auto_caption: false, created_by: a });
    assert.equal(r1.lat, 28.6);
    assert.equal(r1.lon, 77.2);
    assert.equal(r1.max_cloud, 25);
    await assert.rejects(() => regions.create({ name: "DELHI", lat: 1, lon: 1, collection: "sentinel-2-l2a", max_cloud: 30, auto_caption: false, created_by: a }), RegionExistsError);
    await regions.create({ name: "Delhi", lat: 1, lon: 1, collection: "sentinel-2-l2a", max_cloud: 30, auto_caption: false, created_by: b });
    assert.equal(await regions.countForUser(a), 1);
    assert.equal((await regions.listActive(a)).length, 1);
    assert.ok((await regions.listActive(null)).length >= 2);
    const upd = await regions.update(r1.id, { auto_caption: true, active: false });
    assert.deepEqual([upd.auto_caption, upd.active], [true, false]);
    assert.equal((await regions.listActive(a)).length, 0);
    await regions.update(r1.id, { active: true });

    const t1 = new Date("2026-10-19T12:00:00Z");
    await regions.markChecked(r1.id, { at: t1, success: true });
    await regions.markChecked(r1.id, { at: new Date("2026-10-20T12:00:00Z"), success: false });
    const marked = await regions.findById(r1.id);
    assert.equal(new Date(marked.last_success_at).toISOString(), t1.toISOString());
    assert.equal(new Date(marked.last_checked_at).toISOString(), "2026-10-20T12:00:00.000Z");

    const run1 = await runs.start({ trigger: "manual", userId: a });
    assert.equal(run1.status, "running");
    await assert.rejects(() => runs.start({ trigger: "manual", userId: b }), RunInProgressError);
    assert.equal((await runs.running()).id, run1.id);
    await runs.recoverInterrupted();
    assert.equal((await runs.get(run1.id)).status, "failed");
    assert.equal(await runs.running(), null);

    const sceneIds = [`UPD_A_${stamp}`, `UPD_B_${stamp}`];
    ids.scenes = sceneIds;
    const provider = {
      id: "copernicus",
      search: async () => ({ items: sceneIds.map((id, i) => normalizeItem({ ...feature(id, `1${i + 5}`), assets: undefined })), nextUrl: null }),
      getItem: async ({ id }) => normalizeItem(feature(id, "15")),
    };
    const processed = [];
    const engine = createUpdateEngine({ regions, runs, acquisitions, providers: new Map([["copernicus", provider]]), processScene: async ({ acquisition }) => { processed.push(acquisition.external_id); return { captionCreated: true }; }, logger: { error() {} } });

    const run2 = await runs.start({ trigger: "manual", userId: a });
    const done = await engine.execute(run2.id, { userId: a });
    assert.equal(done.status, "succeeded");
    assert.equal(done.regions_checked, 1);
    assert.equal(done.new_acquisitions, 2);
    assert.equal(done.captions_created, 2);
    assert.equal(done.failed_tasks, 0);
    assert.equal(done.summary.regions[0].found, 2);
    assert.equal(processed.length, 2);
    assert.ok((await regions.findById(r1.id)).last_success_at);

    const run3 = await runs.start({ trigger: "manual", userId: a });
    const again = await engine.execute(run3.id, { userId: a });
    assert.equal(again.new_acquisitions, 0);
    assert.equal(again.captions_created, 0);
    assert.equal(processed.length, 2);

    const latest = await runs.latest();
    assert.equal(latest.id, run3.id);
    assert.equal((await runs.lastSuccess()).id, run3.id);
    const page1 = await runs.list({ limit: 2 });
    assert.deepEqual(page1.map((r) => r.id), [run3.id, run2.id]);
    const page2 = await runs.list({ limit: 5, after: { t: page1[1].started_at_raw, id: page1[1].id } });
    assert.equal(page2[0].id, run1.id);
    assert.ok(!page2.some((r) => r.id === run3.id || r.id === run2.id));
  } finally {
    if (ids.scenes) await pool.query("delete from acquisitions where external_id = any($1)", [ids.scenes]);
    if (ids.users) {
      await pool.query("delete from update_runs where created_by = any($1)", [ids.users]);
      await pool.query("delete from users where id = any($1)", [ids.users]);
    }
    await pool.end();
  }
});
