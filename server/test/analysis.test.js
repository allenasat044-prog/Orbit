import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { createStorage } from "../src/storage.js";
import { createAnalysisHandler, sclKeyFor, timeNotes } from "../src/analysis/job.js";
import { createAnalysisRouter, publicAnalysis } from "../src/analysis/routes.js";
import { JobError } from "../src/imagery/chipJob.js";

const A1 = "11111111-1111-4111-8111-111111111111";
const A2 = "22222222-2222-4222-8222-222222222222";
const SQUARE = { type: "Polygon", coordinates: [[[77, 28], [78, 28], [78, 29], [77, 29], [77, 28]]] };
const P = { before_id: A1, after_id: A2, lon: 77.2, lat: 28.6, size_px: 256 };
const SCL = { https_href: "https://x/scl", gsd: 20 };

const acq = (id, date, over = {}) => ({ id, acquired_at: date, visual_asset_key: "TCI_10m", cloud_cover: 3, footprint: SQUARE, assets: { TCI_10m: { https_href: "https://x/tci" }, SCL_20m: SCL, SCL_60m: { https_href: "https://x/scl60", gsd: 60 } }, ...over });

const OK = { status: "ok", scl_used: true, changed_area_ha: 4.8, changed_fraction: 0.03, components: [], transitions: [{ from: "vegetation", to: "not vegetated", area_ha: 4 }], warnings: ["w1"], overlay: { width_px: 256, height_px: 256 } };

function kit({ acqs, mlChange, mlLabelChip, ensureAsset, existing = null } = {}) {
  const map = new Map((acqs ?? [acq(A1, "2026-03-10T05:00:00Z"), acq(A2, "2026-09-12T05:00:00Z")]).map((a) => [a.id, a]));
  const calls = { chips: [], label: [], ensure: [], change: [], removed: [], inserted: [], existsChecks: [] };
  const files = new Set();
  const handler = createAnalysisHandler({
    acquisitions: { findById: async (id) => map.get(id) ?? null },
    chips: { findById: async (id) => ({ id, storage_path: `chips/${id}.png`, gsd_m: 10 }) },
    analyses: {
      findByChips: async () => existing,
      insert: async (a) => { calls.inserted.push(a); return { analysis: { id: "an1" }, created: true }; },
    },
    chipHandler: async ({ acquisition_id }) => { calls.chips.push(acquisition_id); return { chip_id: `chip-${acquisition_id.slice(0, 4)}` }; },
    ensureAsset: ensureAsset ?? (async (a, key) => { calls.ensure.push([a.id, key]); return { storage_path: `assets/${a.id}/${key}.jp2` }; }),
    mlLabelChip: mlLabelChip ?? (async (b) => { calls.label.push(b); files.add(b.out_path); }),
    mlChange: mlChange ?? (async (b) => { calls.change.push(b); return OK; }),
    storage: { exists: (rel) => { calls.existsChecks.push(rel); return files.has(rel); }, remove: async (rel) => calls.removed.push(rel) },
  });
  return { handler, calls };
}

test("helpers pick the finest class-map asset and write plain-language time and cloud notes", () => {
  assert.equal(sclKeyFor(acq(A1, "2026-01-01T00:00:00Z")), "SCL_20m");
  assert.equal(sclKeyFor({ assets: { TCI_10m: {} } }), null);
  assert.equal(sclKeyFor({ assets: { SCL_20m: {} } }), null);
  const { gap, notes } = timeNotes({ acquired_at: "2026-03-10T05:00:00Z" }, { acquired_at: "2026-09-12T05:00:00Z", cloud_cover: 40 });
  assert.equal(gap, 186);
  assert.match(notes[0], /186 days apart/);
  assert.ok(notes.some((n) => /different|seasonal/.test(n)));
  assert.ok(notes.some((n) => /later scene is 40% cloudy/.test(n)));
  const same = timeNotes({ acquired_at: "2025-09-10T05:00:00Z" }, { acquired_at: "2026-09-12T05:00:00Z" });
  assert.equal(same.notes.some((n) => /seasonal/.test(n)), false);
});

test("analysis makes both previews, masks clouds with the class maps, runs the change analysis and stores everything", async () => {
  const k = kit();
  const out = await k.handler(P, { userId: "u1" });
  assert.deepEqual(out, { analysis_id: "an1", reused: false });
  assert.deepEqual(k.calls.chips, [A1, A2]);
  assert.deepEqual(k.calls.ensure.map((c) => c[1]), ["SCL_20m", "SCL_20m"]);
  assert.equal(k.calls.label.length, 2);
  assert.deepEqual(k.calls.label[0], { path: `assets/${A1}/SCL_20m.jp2`, out_path: "chips/chip-1111.scl.png", lon: 77.2, lat: 28.6, size_px: 256, pixel_m: 10 });
  const c = k.calls.change[0];
  assert.deepEqual([c.before_path, c.after_path, c.before_scl_path, c.after_scl_path, c.pixel_m], ["chips/chip-1111.png", "chips/chip-2222.png", "chips/chip-1111.scl.png", "chips/chip-2222.scl.png", 10]);
  assert.match(c.overlay_out_path, /^analysis\/[0-9a-f-]+\.overlay\.png$/);
  const saved = k.calls.inserted[0];
  assert.deepEqual([saved.before_chip_id, saved.after_chip_id, saved.status, saved.scl_used, saved.created_by], ["chip-1111", "chip-2222", "ok", true, "u1"]);
  assert.equal(saved.overlay_path, c.overlay_out_path);
  assert.equal("warnings" in saved.results, false);
  assert.equal(saved.results.changed_area_ha, 4.8);
  assert.ok(saved.notes.includes("w1") && saved.notes.some((n) => /186 days apart/.test(n)));
});

test("scenes given in the wrong order are put in date order", async () => {
  const k = kit();
  await k.handler({ ...P, before_id: A2, after_id: A1 }, {});
  assert.deepEqual(k.calls.chips, [A1, A2]);
});

test("same scene, same date and missing assets are rejected clearly", async () => {
  await assert.rejects(() => kit().handler({ ...P, after_id: A1 }, {}), (e) => e.code === "same_scene");
  const sameDay = kit({ acqs: [acq(A1, "2026-03-10T01:00:00Z"), acq(A2, "2026-03-10T09:00:00Z")] });
  await assert.rejects(() => sameDay.handler(P, {}), (e) => e.code === "same_date");
  const noVisual = kit({ acqs: [acq(A1, "2026-03-10T05:00:00Z", { visual_asset_key: null }), acq(A2, "2026-09-12T05:00:00Z")] });
  await assert.rejects(() => noVisual.handler(P, {}), (e) => e.code === "no_visual_asset");
  await assert.rejects(() => kit({ acqs: [acq(A1, "2026-03-10T05:00:00Z")] }).handler(P, {}), (e) => e.code === "acquisition_not_found");
});

test("without class maps the analysis still runs and says clouds were not masked", async () => {
  const bare = { TCI_10m: { https_href: "https://x/tci" } };
  const k = kit({ acqs: [acq(A1, "2026-03-10T05:00:00Z", { assets: bare }), acq(A2, "2026-09-12T05:00:00Z", { assets: bare })], mlChange: async (b) => ({ ...OK, scl_used: false, warnings: [] }) });
  await k.handler(P, {});
  assert.equal(k.calls.label.length, 0);
  assert.equal(k.calls.inserted[0].scl_used, false);
  assert.ok(k.calls.inserted[0].notes.some((n) => /no scene classification layer/.test(n)));
});

test("a class-map failure that will not fix itself degrades to an unmasked analysis; a temporary one retries the job", async () => {
  const gone = kit({ ensureAsset: async () => { throw new JobError("asset_not_found", "The asset no longer exists at the provider."); } });
  await gone.handler(P, {});
  assert.equal(gone.calls.change[0].before_scl_path, undefined);
  assert.equal(gone.calls.change[0].after_scl_path, undefined);
  assert.ok(gone.calls.inserted[0].notes.some((n) => /could not be masked.*no longer exists/.test(n)));
  const temp = kit({ mlLabelChip: async () => { throw Object.assign(new Error("ML down"), { code: "ml_service_unavailable", retryable: true }); } });
  await assert.rejects(() => temp.handler(P, {}), (e) => e.retryable === true && e.code === "ml_service_unavailable");
  assert.equal(temp.calls.inserted.length, 0);
});

test("class-map previews that already exist are reused, and an existing analysis is returned without redoing the work", async () => {
  const k = kit({ existing: { id: "old-analysis" } });
  assert.deepEqual(await k.handler(P, {}), { analysis_id: "old-analysis", reused: true });
  assert.equal(k.calls.change.length, 0);
  assert.equal(k.calls.label.length, 0);
});

test("when there is too little usable data the result is saved honestly with no overlay and the empty file is cleaned up", async () => {
  const k = kit({ mlChange: async () => ({ status: "insufficient_data", scl_used: true, valid_fraction: 0.1, warnings: ["Only 10% of the area has usable pixels in both images."], overlay: null }) });
  await k.handler(P, {});
  const saved = k.calls.inserted[0];
  assert.equal(saved.status, "insufficient_data");
  assert.equal(saved.overlay_path, null);
  assert.ok(saved.notes.some((n) => /usable pixels/.test(n)));
  assert.equal(k.calls.removed.length, 1);
});

test("model-service errors become job errors with the right retry flag", async () => {
  const bad = kit({ mlChange: async () => { throw Object.assign(new Error("images differ in size"), { code: "size_mismatch", retryable: false }); } });
  await assert.rejects(() => bad.handler(P, {}), (e) => e instanceof JobError && e.code === "size_mismatch" && e.retryable === false);
  const down = kit({ mlChange: async () => { throw Object.assign(new Error("ML down"), { code: "ml_service_unavailable", retryable: true }); } });
  await assert.rejects(() => down.handler(P, {}), (e) => e.retryable === true);
});

// ---------------- routes ----------------
const config = { corsOrigin: "x", rateLimitPerMin: 1000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };
const tok = () => jwt.sign({ role: "user" }, config.jwtSecret, { subject: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" });

function routes(rowOver = {}) {
  const storage = createStorage(fs.mkdtempSync(path.join(os.tmpdir(), "orbit-")));
  const enqueued = [];
  const row = { id: "dddddddd-dddd-4ddd-8ddd-dddddddddddd", status: "ok", scl_used: true, results: { changed_area_ha: 4.8 }, notes: ["n"], overlay_path: "analysis/x.overlay.png", created_at: "2026-10-22T00:00:00Z", before_chip_id: "b0000000-0000-4000-8000-000000000001", after_chip_id: "a0000000-0000-4000-8000-000000000002", center_lat: 28.6, center_lon: 77.2, size_px: 256, bounds: { type: "Polygon", coordinates: [[[77.19, 28.61], [77.21, 28.61], [77.21, 28.59], [77.19, 28.59], [77.19, 28.61]]] }, before_scene: "S2A_B", before_acquired_at: "2026-03-10T05:00:00Z", before_platform: "sentinel-2a", before_cloud: 3, after_scene: "S2B_A", after_acquired_at: "2026-09-12T05:00:00Z", after_platform: "sentinel-2b", after_cloud: 5, ...rowOver };
  const accs = new Map([[A1, acq(A1, "2026-03-10T05:00:00Z")], [A2, acq(A2, "2026-09-12T05:00:00Z")]]);
  const server = createApp({
    config, checks: {}, providers: new Map(),
    routers: [{ path: "/api", router: createAnalysisRouter({
      config, storage,
      acquisitions: { findById: async (id) => accs.get(id) ?? null },
      analyses: { findById: async (id) => (id === row.id ? row : null) },
      runner: { enqueue: async (type, params, userId) => { const j = { id: crypto.randomUUID(), type, params, status: "queued", attempts: 0, created_by: userId }; enqueued.push(j); return j; } },
    }) }],
  }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const post = (body, t = tok()) => fetch(`${base}/api/analysis/compare`, { method: "POST", headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) }, body: JSON.stringify(body) });
  return { base, post, row, storage, enqueued, accs, close: () => server.close() };
}

test("POST /analysis/compare validates input, scenes and the pin, then returns a job", async () => {
  const s = routes();
  const anon = await s.post(P, null);
  const noBody = await s.post({});
  const same = await s.post({ ...P, after_id: A1 });
  const unknown = await s.post({ ...P, after_id: "33333333-3333-4333-8333-333333333333" });
  const outside = await s.post({ ...P, lat: 10, lon: 10 });
  const big = await s.post({ ...P, size_px: 2000 });
  s.accs.set(A2, acq(A2, "2026-09-12T05:00:00Z", { visual_asset_key: null }));
  const noAsset = await s.post(P);
  s.accs.set(A2, acq(A2, "2026-09-12T05:00:00Z"));
  const ok = await s.post(P);
  const body = await ok.json();
  s.close();
  assert.deepEqual([anon.status, noBody.status, same.status, unknown.status, outside.status, big.status, noAsset.status, ok.status], [401, 400, 422, 404, 422, 400, 422, 202]);
  assert.equal(body.job.type, "analyze_change");
  assert.deepEqual(s.enqueued[0].params, P);
});

test("GET /analysis/:id returns scenes, bounds, measured results and honest caveats", async () => {
  const s = routes();
  const r = await (await fetch(`${s.base}/api/analysis/${s.row.id}`)).json();
  const missing = await fetch(`${s.base}/api/analysis/eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee`);
  const bad = await fetch(`${s.base}/api/analysis/nope`);
  s.close();
  const a = r.analysis;
  assert.deepEqual(a.bounds, { west: 77.19, north: 28.61, east: 77.21, south: 28.59 });
  assert.equal(a.before.display_url, "/api/chips/b0000000-0000-4000-8000-000000000001/image?variant=display");
  assert.equal(a.after.platform, "sentinel-2b");
  assert.equal(a.results.changed_area_ha, 4.8);
  assert.equal(a.overlay_url, `/api/analysis/${s.row.id}/overlay`);
  assert.match(a.caveat, /not confirmed real-world events/);
  assert.equal("created_by" in a, false);
  assert.deepEqual([missing.status, bad.status], [404, 400]);
  assert.equal(publicAnalysis({ ...s.row, overlay_path: null }).overlay_url, null);
});

test("the change overlay is served as a PNG, and a missing overlay or file gives a clean 404", async () => {
  const s = routes();
  fs.mkdirSync(path.join(s.storage.root, "analysis"), { recursive: true });
  fs.writeFileSync(s.storage.resolve("analysis/x.overlay.png"), Buffer.from("89504e470d0a1a0a", "hex"));
  const ok = await fetch(`${s.base}/api/analysis/${s.row.id}/overlay`);
  const bytes = Buffer.from(await ok.arrayBuffer());
  fs.rmSync(s.storage.resolve("analysis/x.overlay.png"));
  const gone = await fetch(`${s.base}/api/analysis/${s.row.id}/overlay`);
  s.row.overlay_path = null;
  const none = await fetch(`${s.base}/api/analysis/${s.row.id}/overlay`);
  s.close();
  assert.equal(ok.headers.get("content-type"), "image/png");
  assert.equal(bytes.length, 8);
  assert.deepEqual([gone.status, none.status], [404, 404]);
});
