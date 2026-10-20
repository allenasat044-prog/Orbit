import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { createUpdateEngine } from "../src/updates/engine.js";
import { createSceneProcessor } from "../src/updates/process.js";
import { createUpdateRouter, publicRun } from "../src/updates/routes.js";
import { createRegionRouter, MAX_REGIONS_PER_USER } from "../src/regions/routes.js";
import { RunInProgressError } from "../src/updates/repo.js";
import { RegionExistsError } from "../src/regions/repo.js";
import { ProviderError } from "../src/providers/http.js";
import { JobError } from "../src/imagery/chipJob.js";

const NOW = Date.parse("2026-10-19T12:00:00Z");
const DAY = 86_400_000;
const SQUARE = { type: "Polygon", coordinates: [[[77, 28], [78, 28], [78, 29], [77, 29], [77, 28]]] };
const FAR = { type: "Polygon", coordinates: [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]] };
const REGION = { id: "r1", name: "Delhi", lat: 28.6, lon: 77.2, collection: "sentinel-2-l2a", max_cloud: 30, auto_caption: false, created_by: "u1", last_success_at: null };

const scene = (id, day, footprint = SQUARE) => ({ provider_id: "copernicus", collection: "sentinel-2-l2a", external_id: id, acquired_at: `2026-10-${day}T05:00:00.000Z`, footprint });

function kit({ regions = [REGION], pages = [[]], getItemFails = new Set(), processScene, existing = new Set(), searchError } = {}) {
  const calls = { search: [], upserts: [], marks: [], processed: [] };
  let finished;
  let pageIdx = 0;
  const provider = {
    id: "copernicus",
    async search(params) {
      calls.search.push(params);
      if (searchError) throw searchError;
      const items = pages[Math.min(pageIdx, pages.length - 1)];
      const nextUrl = pageIdx < pages.length - 1 ? `https://next/${pageIdx + 1}` : null;
      pageIdx++;
      return { items, nextUrl, skipped: 0 };
    },
    async getItem({ id }) {
      if (getItemFails.has(id)) throw new ProviderError("down", { code: "provider_unavailable" });
      return { ...scene(id, "01"), assets: { TCI_10m: {} } };
    },
  };
  const engine = createUpdateEngine({
    regions: { listActive: async (uid) => { calls.listActiveArg = uid; return regions; }, markChecked: async (id, m) => calls.marks.push({ id, ...m }) },
    runs: { finish: async (id, f) => (finished = { id, ...f }) },
    acquisitions: {
      findExistingIds: async (_p, ids) => new Map(ids.filter((i) => existing.has(i)).map((i) => [i, `acq-${i}`])),
      upsert: async (rec) => { calls.upserts.push(rec.external_id); return { record: { id: `acq-${rec.external_id}`, ...rec }, created: true }; },
    },
    providers: new Map([["copernicus", provider]]),
    processScene: processScene ?? (async ({ acquisition }) => { calls.processed.push(acquisition.external_id); return { captionCreated: true }; }),
    now: () => NOW,
    sleep: async () => {},
    logger: { error() {} },
    limits: { retryBackoffMs: 1 },
  });
  return { engine, calls, finished: () => finished };
}

test("first run looks back 14 days; later runs resume from the last success with a one-day overlap", async () => {
  const a = kit({ regions: [{ ...REGION }] });
  await a.engine.execute("run", { userId: "u1" });
  assert.equal(a.calls.search[0].start, "2026-10-05T12:00:00Z");
  assert.equal(a.calls.search[0].end, "2026-10-19T12:00:00Z");
  assert.equal(a.calls.search[0].collection, "sentinel-2-l2a");
  assert.equal(a.calls.search[0].cloudMax, 30);
  const [w, , e] = a.calls.search[0].bbox;
  assert.ok(e - w < 0.01);

  const b = kit({ regions: [{ ...REGION, last_success_at: "2026-10-17T12:00:00Z" }] });
  await b.engine.execute("run", { userId: "u1" });
  assert.equal(b.calls.search[0].start, "2026-10-16T12:00:00Z");
});

test("new scenes covering the pin are registered, others and known scenes are skipped", async () => {
  const k = kit({ pages: [[scene("A", "18"), scene("B", "17", FAR), scene("C", "16"), scene("D", "15")]], existing: new Set(["C"]) });
  const run = await k.engine.execute("run", { userId: "u1" });
  assert.deepEqual(k.calls.upserts, ["A", "D"]);
  assert.equal(run.new_acquisitions, 2);
  assert.equal(run.status, "succeeded");
  assert.equal(run.regions_checked, 1);
  assert.deepEqual(k.calls.processed, []);
  assert.equal(run.captions_created, 0);
});

test("follows result pages up to the limit", async () => {
  const k = kit({ pages: [[scene("A", "18")], [scene("B", "17")], [scene("C", "16")], [scene("D", "15")]] });
  const run = await k.engine.execute("run", { userId: "u1" });
  assert.equal(k.calls.search.length, 3);
  assert.equal(k.calls.search[1].cursorUrl, "https://next/1");
  assert.equal(run.new_acquisitions, 3);
});

test("auto-caption processes only the newest few new scenes and counts newly created captions", async () => {
  const k = kit({
    regions: [{ ...REGION, auto_caption: true }],
    pages: [[scene("A", "10"), scene("B", "18"), scene("C", "12"), scene("D", "16"), scene("E", "14")]],
    processScene: async ({ acquisition }) => { k.calls.processed.push(acquisition.external_id); return { captionCreated: acquisition.external_id !== "D" }; },
  });
  const run = await k.engine.execute("run", { userId: "u1" });
  assert.deepEqual(k.calls.processed, ["B", "D", "E"]);
  assert.equal(run.new_acquisitions, 5);
  assert.equal(run.captions_created, 2);
});

test("processing failures are counted but do not fail the run; retryable ones are retried with backoff", async () => {
  let n = 0;
  const flaky = kit({ regions: [{ ...REGION, auto_caption: true }], pages: [[scene("A", "18")]], processScene: async () => { if (++n < 3) throw new JobError("ml_service_unavailable", "down", true); return { captionCreated: true }; } });
  const ok = await flaky.engine.execute("run", { userId: "u1" });
  assert.equal(n, 3);
  assert.equal(ok.captions_created, 1);
  assert.equal(ok.failed_tasks, 0);

  const dead = kit({ regions: [{ ...REGION, auto_caption: true }], pages: [[scene("A", "18"), scene("B", "17")]], processScene: async ({ acquisition }) => { throw new JobError(acquisition.external_id === "A" ? "model_unavailable" : "ml_service_unavailable", "nope", acquisition.external_id === "B"); } });
  const run = await dead.engine.execute("run", { userId: "u1" });
  assert.equal(run.status, "succeeded");
  assert.equal(run.new_acquisitions, 2);
  assert.equal(run.failed_tasks, 2);
  assert.deepEqual(run.summary.regions[0].errors.map((e) => [e.stage, e.scene, e.code]), [["process", "A", "model_unavailable"], ["process", "B", "ml_service_unavailable"]]);
  assert.equal(dead.calls.marks[0].success, true);
});

test("a provider outage fails that region, other regions continue, and only fully failed runs are marked failed", async () => {
  const outage = new ProviderError("down", { code: "provider_unavailable" });
  const all = kit({ searchError: outage, regions: [REGION, { ...REGION, id: "r2", name: "Mumbai" }] });
  const failed = await all.engine.execute("run", { userId: "u1" });
  assert.equal(failed.status, "failed");
  assert.equal(failed.failed_tasks, 2);
  assert.deepEqual(all.calls.marks.map((m) => m.success), [false, false]);

  let call = 0;
  const some = kit({ regions: [REGION, { ...REGION, id: "r2", name: "Mumbai" }], pages: [[scene("A", "18")]] });
  const orig = some.engine.checkRegion;
  const wrapped = createUpdateEngine({
    regions: { listActive: async () => [REGION, { ...REGION, id: "r2", name: "Mumbai" }], markChecked: async (id, m) => some.calls.marks.push({ id, ...m }) },
    runs: { finish: async (id, f) => f },
    acquisitions: { findExistingIds: async () => new Map(), upsert: async (rec) => ({ record: { id: "x", ...rec }, created: true }) },
    providers: new Map([["copernicus", { id: "copernicus", search: async () => { if (++call === 1) throw outage; return { items: [scene("A", "18")], nextUrl: null }; }, getItem: async ({ id }) => scene(id, "01") }]]),
    processScene: async () => ({}), now: () => NOW, sleep: async () => {}, logger: { error() {} },
  });
  const partial = await wrapped.execute("run", { userId: "u1" });
  assert.equal(partial.status, "succeeded");
  assert.equal(partial.new_acquisitions, 1);
  assert.equal(partial.failed_tasks, 1);
  assert.deepEqual(some.calls.marks.map((m) => [m.id, m.success]), [["r1", false], ["r2", true]]);
  assert.ok(orig);
});

test("a scene that fails to register keeps the region's window open so it is retried next time", async () => {
  const k = kit({ pages: [[scene("A", "18"), scene("B", "17")]], getItemFails: new Set(["A"]) });
  const run = await k.engine.execute("run", { userId: "u1" });
  assert.equal(run.new_acquisitions, 1);
  assert.equal(run.failed_tasks, 1);
  assert.equal(k.calls.marks[0].success, false);
  assert.equal(run.status, "succeeded");
});

test("no regions, admin scope and unexpected crashes are handled", async () => {
  const none = kit({ regions: [] });
  const run = await none.engine.execute("run", { userId: "u1" });
  assert.equal(run.status, "succeeded");
  assert.equal(run.regions_checked, 0);
  assert.match(run.summary.note, /Monitor this location/);
  assert.equal(none.calls.listActiveArg, "u1");

  const admin = kit({ regions: [] });
  await admin.engine.execute("run", { userId: "u1", role: "admin" });
  assert.equal(admin.calls.listActiveArg, null);
  const sched = kit({ regions: [] });
  await sched.engine.execute("run", { userId: null });
  assert.equal(sched.calls.listActiveArg, null);

  const crash = createUpdateEngine({ regions: { listActive: async () => { throw new Error("db gone"); } }, runs: { finish: async (id, f) => f }, acquisitions: {}, providers: new Map(), processScene: async () => ({}), logger: { error() {} } });
  const failed = await crash.execute("run", {});
  assert.equal(failed.status, "failed");
  assert.equal(failed.summary.error, "db gone");
});

test("scene processor makes a chip at the region pin and captions it, reporting whether a caption was newly created", async () => {
  const seen = [];
  const p = createSceneProcessor({
    chipHandler: async (a) => { seen.push(["chip", a]); return { chip_id: "c1" }; },
    captionHandler: async (a, ctx) => { seen.push(["caption", a, ctx]); return { reused: false }; },
  });
  const out = await p({ acquisition: { id: "acq1" }, region: { lon: 77.2, lat: 28.6, created_by: "u1" } });
  assert.deepEqual(out, { captionCreated: true });
  assert.deepEqual(seen[0], ["chip", { acquisition_id: "acq1", lon: 77.2, lat: 28.6, size_px: 256 }]);
  assert.deepEqual(seen[1], ["caption", { chip_id: "c1", model_id: "smolvlm-instruct" }, { userId: "u1" }]);
});

// ---------------- routes ----------------
const config = { corsOrigin: "x", rateLimitPerMin: 1000, authRateLimit: 1000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };
const U1 = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const U2 = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const tok = (id, role = "user") => jwt.sign({ role }, config.jwtSecret, { subject: id });
const uid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

function runsKit({ rows = [], running = null, enqueueFails = false } = {}) {
  const state = { rows: [...rows], started: [], finished: [], enqueued: [] };
  const runs = {
    start: async ({ trigger, userId }) => { if (running) throw new RunInProgressError(); const r = { id: crypto.randomUUID(), trigger, status: "running", started_at: "2026-10-19T00:00:00Z", finished_at: null, regions_checked: 0, new_acquisitions: 0, captions_created: 0, failed_tasks: 0, created_by: userId, summary: {} }; state.started.push(r); return r; },
    finish: async (id, f) => state.finished.push({ id, ...f }),
    running: async () => running, latest: async () => state.rows[0] ?? null, lastSuccess: async () => state.rows.find((r) => r.status === "succeeded") ?? null,
    get: async (id) => state.rows.find((r) => r.id === id) ?? null,
    list: async ({ limit, after }) => { const start = after ? state.rows.findIndex((r) => r.id === after.id) + 1 : 0; return state.rows.slice(start, start + limit); },
  };
  const runner = { enqueue: async (type, params, userId) => { if (enqueueFails) throw new Error("queue down"); const j = { id: crypto.randomUUID(), type, params, status: "queued", attempts: 0, created_by: userId }; state.enqueued.push(j); return j; } };
  const server = createApp({ config, checks: {}, providers: new Map(), routers: [{ path: "/api", router: createUpdateRouter({ config, runs, runner }) }] }).listen(0);
  return { ...state, state, base: `http://localhost:${server.address().port}`, close: () => server.close() };
}

const row = (n, over = {}) => ({ id: uid(n), trigger: "manual", status: "succeeded", started_at: `2026-10-1${n}T00:00:00Z`, started_at_raw: `2026-10-1${n} 00:00:00.123456+00`, finished_at: `2026-10-1${n}T00:05:00Z`, regions_checked: 1, new_acquisitions: n, captions_created: 1, failed_tasks: 0, created_by: U1, summary: { regions: [{ name: "Delhi" }] }, ...over });

test("POST /updates/run needs login, starts a run and a job, and refuses a second concurrent run", async () => {
  const s = runsKit();
  const anon = await fetch(`${s.base}/api/updates/run`, { method: "POST" });
  const ok = await fetch(`${s.base}/api/updates/run`, { method: "POST", headers: { Authorization: `Bearer ${tok(U1)}` } });
  const body = await ok.json();
  s.close();
  assert.equal(anon.status, 401);
  assert.equal(ok.status, 202);
  assert.equal(body.run.status, "running");
  assert.equal("summary" in body.run, false);
  assert.equal(body.job.type, "update_run");
  assert.deepEqual(s.enqueued[0].params, { run_id: body.run.id, user_id: U1, role: "user" });

  const busy = runsKit({ running: row(1, { status: "running" }) });
  const conflict = await fetch(`${busy.base}/api/updates/run`, { method: "POST", headers: { Authorization: `Bearer ${tok(U1)}` } });
  busy.close();
  assert.equal(conflict.status, 409);
  assert.equal((await conflict.json()).error.code, "run_in_progress");
});

test("a run that cannot be queued is closed as failed instead of staying 'running' forever", async () => {
  const s = runsKit({ enqueueFails: true });
  const res = await fetch(`${s.base}/api/updates/run`, { method: "POST", headers: { Authorization: `Bearer ${tok(U1)}` } });
  s.close();
  assert.equal(res.status, 500);
  assert.equal(s.finished.length, 1);
  assert.equal(s.finished[0].status, "failed");
});

test("history and status are public and expose only counts, in the shape the Dashboard reads", async () => {
  const s = runsKit({ rows: [row(3), row(2, { status: "failed" }), row(1)] });
  const hist = await (await fetch(`${s.base}/api/updates/history`)).json();
  const status = await (await fetch(`${s.base}/api/updates/status`)).json();
  s.close();
  assert.deepEqual(hist.items.map((r) => r.id), [uid(3), uid(2), uid(1)]);
  assert.deepEqual(Object.keys(hist.items[0]).sort(), ["captions_created", "failed_tasks", "finished_at", "id", "new_acquisitions", "regions_checked", "started_at", "status", "trigger"]);
  assert.equal(hist.next_cursor, null);
  assert.equal(JSON.stringify(hist).includes("Delhi"), false);
  assert.equal(status.running, null);
  assert.equal(status.last_run.id, uid(3));
  assert.equal(status.last_success_at, "2026-10-13T00:05:00Z");
  assert.equal(status.schedule.mode, "manual");
  assert.equal(publicRun(row(1)).created_by, undefined);
});

test("history paginates and validates its inputs", async () => {
  const s = runsKit({ rows: [row(3), row(2), row(1)] });
  const p1 = await (await fetch(`${s.base}/api/updates/history?limit=2`)).json();
  const p2 = await (await fetch(`${s.base}/api/updates/history?limit=2&cursor=${p1.next_cursor}`)).json();
  const bad = await fetch(`${s.base}/api/updates/history?limit=999`);
  const badCursor = await fetch(`${s.base}/api/updates/history?cursor=zzz`);
  s.close();
  assert.deepEqual(p1.items.map((r) => r.id), [uid(3), uid(2)]);
  assert.deepEqual(p2.items.map((r) => r.id), [uid(1)]);
  assert.deepEqual([bad.status, badCursor.status], [400, 400]);
});

test("run details with per-location results are visible only to the owner and admins", async () => {
  const s = runsKit({ rows: [row(1)] });
  const get = (t, id = uid(1)) => fetch(`${s.base}/api/updates/runs/${id}`, { headers: t ? { Authorization: `Bearer ${t}` } : {} });
  const owner = await get(tok(U1));
  const other = await get(tok(U2));
  const admin = await get(tok(U2, "admin"));
  const anon = await get(null);
  const bad = await get(tok(U1), "nope");
  s.close();
  assert.deepEqual([owner.status, other.status, admin.status, anon.status, bad.status], [200, 404, 200, 401, 400]);
  assert.deepEqual((await owner.json()).run.summary, { regions: [{ name: "Delhi" }] });
});

function regionKit(initial = []) {
  const rows = [...initial];
  const repo = {
    findById: async (id) => rows.find((r) => r.id === id) ?? null,
    countForUser: async (u) => rows.filter((r) => r.created_by === u).length,
    listForUser: async (u) => rows.filter((r) => r.created_by === u),
    create: async (r) => { if (rows.some((x) => x.created_by === r.created_by && x.name.toLowerCase() === r.name.toLowerCase())) throw new RegionExistsError(); const row = { id: crypto.randomUUID(), active: true, created_at: "2026-10-19T00:00:00Z", last_checked_at: null, last_success_at: null, ...r }; rows.push(row); return row; },
    update: async (id, patch) => Object.assign(rows.find((r) => r.id === id), patch),
    remove: async (id) => { rows.splice(rows.findIndex((r) => r.id === id), 1); return true; },
  };
  const server = createApp({ config, checks: {}, providers: new Map(), routers: [{ path: "/api", router: createRegionRouter({ config, regions: repo }) }] }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const call = (method, path, body, t = tok(U1)) => fetch(`${base}/api/regions${path}`, { method, headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { rows, call, close: () => server.close() };
}

test("regions: create with defaults, validate, reject duplicates and enforce the per-user limit", async () => {
  const s = regionKit();
  const ok = await s.call("POST", "", { name: "  Campus ", lat: 12.97, lon: 77.59 });
  const body = await ok.json();
  const dup = await s.call("POST", "", { name: "campus", lat: 1, lon: 1 });
  const anon = await s.call("POST", "", { name: "x", lat: 1, lon: 1 }, null);
  const bad = await Promise.all([{ lat: 1, lon: 1 }, { name: "x", lat: 100, lon: 1 }, { name: "x", lat: 1, lon: 1, max_cloud: 500 }, { name: "x", lat: 1, lon: 1, collection: "landsat" }].map((b) => s.call("POST", "", b)));
  assert.equal(ok.status, 201);
  assert.deepEqual([body.region.name, body.region.max_cloud, body.region.auto_caption, body.region.active, body.region.location], ["Campus", 30, false, true, { lat: 12.97, lon: 77.59 }]);
  assert.equal(dup.status, 409);
  assert.equal(anon.status, 401);
  assert.deepEqual(bad.map((r) => r.status), [400, 400, 400, 400]);
  for (let i = 0; i < MAX_REGIONS_PER_USER; i++) s.rows.push({ id: crypto.randomUUID(), name: `n${i}`, created_by: U1 });
  const over = await s.call("POST", "", { name: "one more", lat: 1, lon: 1 });
  s.close();
  assert.equal(over.status, 422);
  assert.equal((await over.json()).error.code, "region_limit");
});

test("regions: list shows only mine; patch and delete work for the owner and admins but hide other people's", async () => {
  const mine = { id: uid(1), name: "Mine", lat: 1, lon: 2, collection: "sentinel-2-l2a", max_cloud: 30, auto_caption: false, active: true, created_by: U1 };
  const theirs = { ...mine, id: uid(2), name: "Theirs", created_by: U2 };
  const s = regionKit([mine, theirs]);
  const list = await (await s.call("GET", "")).json();
  const patched = await s.call("PATCH", `/${uid(1)}`, { auto_caption: true, max_cloud: 10 });
  const strict = await s.call("PATCH", `/${uid(1)}`, { created_by: U2 });
  const foreign = await s.call("PATCH", `/${uid(2)}`, { active: false });
  const adminPatch = await s.call("PATCH", `/${uid(2)}`, { active: false }, tok(U1, "admin"));
  const badId = await s.call("DELETE", "/nope");
  const delOther = await s.call("DELETE", `/${uid(2)}`);
  const delMine = await s.call("DELETE", `/${uid(1)}`);
  s.close();
  assert.deepEqual(list.items.map((r) => r.id), [uid(1)]);
  assert.deepEqual([patched.status, strict.status, foreign.status, adminPatch.status, badId.status, delOther.status, delMine.status], [200, 400, 404, 200, 400, 404, 204]);
  assert.equal((await patched.json()).region.auto_caption, true);
});
