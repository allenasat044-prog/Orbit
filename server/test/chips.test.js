import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { createStorage } from "../src/storage.js";
import { createTokenManager, ProviderAuthError } from "../src/providers/copernicusAuth.js";
import { downloadToFile, DownloadError } from "../src/providers/download.js";
import { createJobRunner } from "../src/jobs/runner.js";
import { createChipHandler, JobError, chipKey } from "../src/imagery/chipJob.js";
import { createChipRouter } from "../src/imagery/chipRoutes.js";

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "orbit-"));
const resp = (status, body, headers = {}) => ({ ok: status >= 200 && status < 300, status, headers: { get: (k) => headers[k.toLowerCase()] ?? null }, json: async () => body });

// ---------- storage ----------
test("storage resolves inside its root and refuses to escape it", () => {
  const s = createStorage(tmp());
  assert.ok(s.resolve("assets/a/b.jp2").startsWith(s.root));
  assert.throws(() => s.resolve("../outside.txt"), /escapes/);
  assert.throws(() => s.resolve("/etc/passwd"), /escapes/);
});

// ---------- token manager ----------
test("token manager sends the documented password grant and caches the token", async () => {
  let calls = 0;
  let body;
  const t = createTokenManager({ username: "u@x.io", password: "p@ss word", tokenUrl: "https://id/token", fetchImpl: async (_u, init) => { calls++; body = init.body; return resp(200, { access_token: "tok", expires_in: 600 }); } });
  assert.equal(await t.getToken(), "tok");
  assert.equal(await t.getToken(), "tok");
  assert.equal(calls, 1);
  assert.equal(body.get("client_id"), "cdse-public");
  assert.equal(body.get("grant_type"), "password");
  assert.equal(body.get("password"), "p@ss word");
});

test("token manager refreshes near expiry, shares one in-flight request, and can be invalidated", async () => {
  let calls = 0;
  let now = 0;
  const t = createTokenManager({ username: "u", password: "p", tokenUrl: "x", now: () => now, fetchImpl: async () => { calls++; await new Promise((r) => setTimeout(r, 5)); return resp(200, { access_token: `t${calls}`, expires_in: 600 }); } });
  const [a, b] = await Promise.all([t.getToken(), t.getToken()]);
  assert.equal(a, b);
  assert.equal(calls, 1);
  now = 560_000;
  assert.equal(await t.getToken(), "t2");
  t.invalidate();
  assert.equal(await t.getToken(), "t3");
});

test("token manager reports missing, rejected and unreachable credentials distinctly", async () => {
  let called = false;
  const none = createTokenManager({ username: "", password: "", tokenUrl: "x", fetchImpl: async () => { called = true; } });
  await assert.rejects(() => none.getToken(), (e) => e.code === "provider_not_configured" && /COPERNICUS_USERNAME/.test(e.message));
  assert.equal(called, false);
  const bad = createTokenManager({ username: "u", password: "p", tokenUrl: "x", fetchImpl: async () => resp(401, {}) });
  await assert.rejects(() => bad.getToken(), (e) => e instanceof ProviderAuthError && e.code === "provider_auth_failed" && !e.retryable);
  const down = createTokenManager({ username: "u", password: "p", tokenUrl: "x", fetchImpl: async () => { throw new Error("net"); } });
  await assert.rejects(() => down.getToken(), (e) => e.code === "provider_unavailable" && e.retryable);
});

// ---------- downloader (real local HTTP server) ----------
const PAYLOAD = crypto.randomBytes(200_000);
async function fileServer() {
  const seen = [];
  const server = http.createServer((req, res) => {
    seen.push({ url: req.url, auth: req.headers.authorization });
    if (req.url === "/redirect") { res.writeHead(302, { Location: "/file" }); return res.end(); }
    if (req.url === "/evil-redirect") { res.writeHead(302, { Location: `http://127.0.0.1:${server.address().port}/secret` }); return res.end(); }
    if (req.url === "/file") {
      if (req.headers.authorization !== "Bearer tok") { res.writeHead(401); return res.end(); }
      res.writeHead(200, { "Content-Type": "image/jp2", "Content-Length": PAYLOAD.length });
      return res.end(PAYLOAD);
    }
    if (req.url === "/chunked") { res.writeHead(200); res.write(PAYLOAD); return res.end(PAYLOAD); }
    if (req.url === "/boom") { res.writeHead(503); return res.end(); }
    res.writeHead(404);
    res.end();
  }).listen(0);
  return { base: `http://localhost:${server.address().port}`, seen, close: () => server.close() };
}

test("download follows redirects, sends the bearer token, streams to disk and hashes the file", async () => {
  const s = await fileServer();
  const dest = path.join(tmp(), "scene.jp2");
  const r = await downloadToFile({ url: `${s.base}/redirect`, destPath: dest, token: "tok", maxBytes: 1_000_000, allowedHosts: ["localhost"] });
  s.close();
  assert.equal(r.size, PAYLOAD.length);
  assert.equal(r.sha256, crypto.createHash("sha256").update(PAYLOAD).digest("hex"));
  assert.equal(r.contentType, "image/jp2");
  assert.deepEqual(fs.readFileSync(dest), PAYLOAD);
  assert.deepEqual(s.seen.map((x) => x.auth), ["Bearer tok", "Bearer tok"]);
  assert.equal(fs.existsSync(`${dest}.part`), false);
});

test("download never sends the token to a host outside the allow-list, even via redirect", async () => {
  const s = await fileServer();
  await assert.rejects(() => downloadToFile({ url: `${s.base}/evil-redirect`, destPath: path.join(tmp(), "x"), token: "tok", allowedHosts: ["localhost"] }), (e) => e.code === "host_not_allowed");
  await assert.rejects(() => downloadToFile({ url: `${s.base}/file`, destPath: path.join(tmp(), "x"), token: "tok", allowedHosts: ["example.com"] }), (e) => e.code === "host_not_allowed");
  s.close();
  assert.equal(s.seen.some((x) => x.url === "/secret"), false);
  assert.equal(s.seen.length, 1);
});

test("download maps 401 to an auth error, 404 and 503 to clear errors, and rejects plain http for real hosts", async () => {
  const s = await fileServer();
  const d = path.join(tmp(), "x");
  await assert.rejects(() => downloadToFile({ url: `${s.base}/file`, destPath: d, token: "wrong", allowedHosts: ["localhost"] }), (e) => e instanceof ProviderAuthError && e.code === "provider_auth_failed");
  await assert.rejects(() => downloadToFile({ url: `${s.base}/missing`, destPath: d, token: "tok", allowedHosts: ["localhost"] }), (e) => e.code === "asset_not_found");
  await assert.rejects(() => downloadToFile({ url: `${s.base}/boom`, destPath: d, token: "tok", allowedHosts: ["localhost"] }), (e) => e instanceof DownloadError && e.retryable);
  s.close();
  await assert.rejects(() => downloadToFile({ url: "http://download.dataspace.copernicus.eu/x", destPath: d, token: "t", allowedHosts: ["dataspace.copernicus.eu"] }), (e) => e.code === "insecure_url");
});

test("download enforces the size limit by header and while streaming, and cleans up partial files", async () => {
  const s = await fileServer();
  const dir = tmp();
  await assert.rejects(() => downloadToFile({ url: `${s.base}/file`, destPath: path.join(dir, "a"), token: "tok", maxBytes: 1000, allowedHosts: ["localhost"] }), (e) => e.code === "too_large");
  await assert.rejects(() => downloadToFile({ url: `${s.base}/chunked`, destPath: path.join(dir, "b"), token: "tok", maxBytes: 250_000, allowedHosts: ["localhost"] }), (e) => e.code === "too_large");
  s.close();
  assert.deepEqual(fs.readdirSync(dir), []);
});

// ---------- job runner ----------
function memJobs() {
  const rows = new Map();
  const set = (id, patch) => { rows.set(id, { ...rows.get(id), ...patch }); return rows.get(id); };
  return {
    rows,
    async create({ type, params, userId }) { const id = crypto.randomUUID(); rows.set(id, { id, type, params, status: "queued", attempts: 0, created_by: userId }); return rows.get(id); },
    async get(id) { return rows.get(id) ?? null; },
    async markRunning(id) { return set(id, { status: "running", attempts: rows.get(id).attempts + 1 }); },
    async markSucceeded(id, result) { return set(id, { status: "succeeded", result }); },
    async markFailed(id, error) { return set(id, { status: "failed", error }); },
    async requeue(id) { return set(id, { status: "queued" }); },
    async recoverInterrupted() { for (const r of rows.values()) if (r.status === "running") set(r.id, { status: "failed", error: { code: "interrupted" } }); },
    async listQueued() { return [...rows.values()].filter((r) => r.status === "queued").map((r) => ({ id: r.id })); },
  };
}
const settle = async (runner) => { for (let i = 0; i < 200 && !runner.idle(); i++) await new Promise((r) => setTimeout(r, 5)); await new Promise((r) => setTimeout(r, 20)); };
const quiet = { error() {} };

test("runner records success and failure with error codes", async () => {
  const repo = memJobs();
  const runner = createJobRunner({ repo, logger: quiet, handlers: { ok: async (p) => ({ doubled: p.n * 2 }), bad: async () => { throw new JobError("nope", "Not allowed"); } } });
  const a = await runner.enqueue("ok", { n: 4 }, "u1");
  const b = await runner.enqueue("bad", {}, "u1");
  await settle(runner);
  assert.equal(repo.rows.get(a.id).status, "succeeded");
  assert.deepEqual(repo.rows.get(a.id).result, { doubled: 8 });
  assert.equal(repo.rows.get(b.id).status, "failed");
  assert.deepEqual(repo.rows.get(b.id).error, { code: "nope", message: "Not allowed" });
  await assert.rejects(() => runner.enqueue("missing", {}, "u1"), /Unknown job type/);
});

test("runner retries retryable errors with backoff, then gives up after maxAttempts", async () => {
  const repo = memJobs();
  let n = 0;
  let m = 0;
  const runner = createJobRunner({ repo, logger: quiet, backoffMs: 1, maxAttempts: 3, handlers: {
    flaky: async () => { if (++n < 3) throw new JobError("provider_unavailable", "down", true); return { n }; },
    dead: async () => { m++; throw new JobError("provider_unavailable", "down", true); },
  } });
  const a = await runner.enqueue("flaky", {}, "u");
  const b = await runner.enqueue("dead", {}, "u");
  for (let i = 0; i < 100 && (repo.rows.get(a.id).status !== "succeeded" || repo.rows.get(b.id).status !== "failed"); i++) await new Promise((r) => setTimeout(r, 10));
  assert.equal(repo.rows.get(a.id).status, "succeeded");
  assert.equal(repo.rows.get(a.id).attempts, 3);
  assert.equal(repo.rows.get(b.id).status, "failed");
  assert.equal(m, 3);
});

test("runner runs one job at a time by default and recovers interrupted and queued jobs on restart", async () => {
  const repo = memJobs();
  let running = 0;
  let peak = 0;
  const handlers = { slow: async () => { running++; peak = Math.max(peak, running); await new Promise((r) => setTimeout(r, 15)); running--; return {}; } };
  const runner = createJobRunner({ repo, handlers, logger: quiet });
  await Promise.all([runner.enqueue("slow", {}, "u"), runner.enqueue("slow", {}, "u"), runner.enqueue("slow", {}, "u")]);
  await settle(runner);
  assert.equal(peak, 1);

  const repo2 = memJobs();
  const stuck = await repo2.create({ type: "slow", params: {}, userId: "u" });
  await repo2.markRunning(stuck.id);
  const waiting = await repo2.create({ type: "slow", params: {}, userId: "u" });
  const runner2 = createJobRunner({ repo: repo2, handlers, logger: quiet });
  await runner2.recover();
  await settle(runner2);
  assert.equal(repo2.rows.get(stuck.id).status, "failed");
  assert.equal(repo2.rows.get(stuck.id).error.code, "interrupted");
  assert.equal(repo2.rows.get(waiting.id).status, "succeeded");
});

// ---------- chip handler ----------
const ACQ = "11111111-1111-4111-8111-111111111111";
function handlerKit(over = {}) {
  const storage = createStorage(tmp());
  const acq = { id: ACQ, visual_asset_key: "TCI_10m", assets: { TCI_10m: { https_href: "https://download.dataspace.copernicus.eu/x", type: "image/jp2" } }, ...over.acq };
  const state = { assets: new Map(), chips: new Map(), downloads: 0, ml: 0, invalidated: 0 };
  const deps = {
    storage,
    acquisitions: { findById: async (id) => (id === ACQ ? acq : null) },
    assets: {
      find: async (a, k) => state.assets.get(`${a}:${k}`) ?? null,
      insert: async (x) => { const row = { id: crypto.randomUUID(), ...x }; state.assets.set(`${x.acquisition_id}:${x.asset_key}`, row); return row; },
    },
    chips: {
      findByKey: async (a, k) => state.chips.get(`${a}:${k}`) ?? null,
      insert: async (c) => {
        const key = `${c.acquisition_id}:${c.center_key}`;
        if (over.raceExisting && !state.chips.has(key)) { state.chips.set(key, { id: "existing-chip" }); }
        if (state.chips.has(key)) return { chip: state.chips.get(key), created: false };
        state.chips.set(key, c);
        return { chip: c, created: true };
      },
    },
    tokens: { getToken: async () => "tok", invalidate: () => state.invalidated++ },
    download: over.download ?? (async ({ destPath }) => { state.downloads++; fs.writeFileSync(destPath, "jp2"); return { sha256: "abc", size: 3, contentType: "image/jp2" }; }),
    mlChip: over.mlChip ?? (async ({ out_path }) => { state.ml++; fs.mkdirSync(path.dirname(storage.resolve(out_path)), { recursive: true }); fs.writeFileSync(storage.resolve(out_path), "png"); return { width_px: 512, height_px: 512, pin_px: { x: 256, y: 256 }, gsd_m: 10, crs: "EPSG:32650", nodata_fraction: 0, bounds: { type: "Polygon", coordinates: [] }, sha256: "def" }; }),
    limits: { maxBytes: 1e6, allowedHosts: ["dataspace.copernicus.eu"], timeoutMs: 1000 },
  };
  return { handler: createChipHandler(deps), state, storage };
}
const P = { acquisition_id: ACQ, lon: 114.9, lat: 67.4, size_px: 512 };

test("chip job downloads the asset once, reuses it for new pins, and reuses identical chips", async () => {
  const { handler, state } = handlerKit();
  const a = await handler(P);
  const b = await handler({ ...P, lon: 114.91 });
  const c = await handler(P);
  assert.equal(state.downloads, 1);
  assert.equal(state.ml, 2);
  assert.equal(c.chip_id, a.chip_id);
  assert.equal(c.reused, true);
  assert.notEqual(a.chip_id, b.chip_id);
  assert.equal(chipKey(114.9, 67.4, 512), "114.90000,67.40000,512,v2");
});

test("chip job fails clearly without a visual asset, a download URL, or a scene", async () => {
  await assert.rejects(() => handlerKit({ acq: { visual_asset_key: null } }).handler(P), (e) => e.code === "no_visual_asset");
  await assert.rejects(() => handlerKit({ acq: { assets: { TCI_10m: {} } } }).handler(P), (e) => e.code === "no_download_url");
  await assert.rejects(() => handlerKit().handler({ ...P, acquisition_id: "22222222-2222-4222-8222-222222222222" }), (e) => e.code === "acquisition_not_found");
});

test("a rejected download invalidates the cached token and surfaces the auth error", async () => {
  const k = handlerKit({ download: async () => { throw new ProviderAuthError("provider_auth_failed", "refused"); } });
  await assert.rejects(() => k.handler(P), (e) => e.code === "provider_auth_failed");
  assert.equal(k.state.invalidated, 1);
  assert.equal(k.state.assets.size, 0);
});

test("ML failures propagate and a lost insert race removes the duplicate image", async () => {
  const bad = handlerKit({ mlChip: async () => { throw new JobError("chip_mostly_empty", "scene edge"); } });
  await assert.rejects(() => bad.handler(P), (e) => e.code === "chip_mostly_empty");
  const race = handlerKit({ raceExisting: true });
  const r = await race.handler(P);
  assert.equal(r.chip_id, "existing-chip");
  assert.equal(fs.readdirSync(path.join(race.storage.root, "chips")).length, 0);
});

// ---------- routes ----------
const config = { corsOrigin: "x", rateLimitPerMin: 1000, authRateLimit: 1000, searchRateLimit: 1000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };
const FOOTPRINT = { type: "Polygon", coordinates: [[[114, 67], [116, 67], [116, 68], [114, 68], [114, 67]]] };
const tokenFor = (id, role = "user") => jwt.sign({ role }, config.jwtSecret, { subject: id });
const OWNER = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const OTHER = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";

function routeKit(acqOver = {}) {
  const storage = createStorage(tmp());
  const acq = { id: ACQ, footprint: FOOTPRINT, visual_asset_key: "TCI_10m", ...acqOver };
  const chipsMap = new Map();
  const jobsMap = new Map();
  const enqueued = [];
  const deps = {
    config, storage,
    acquisitions: { findById: async (id) => (id === ACQ ? acq : null) },
    chips: { findById: async (id) => [...chipsMap.values()].find((c) => c.id === id) ?? null, findByKey: async (a, k) => chipsMap.get(`${a}:${k}`) ?? null },
    jobs: { get: async (id) => jobsMap.get(id) ?? null },
    runner: { enqueue: async (type, params, userId) => { const j = { id: crypto.randomUUID(), type, params, status: "queued", attempts: 0, created_by: userId }; jobsMap.set(j.id, j); enqueued.push(j); return j; } },
  };
  const server = createApp({ config, checks: {}, providers: new Map(), routers: [{ path: "/api", router: createChipRouter(deps) }] }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const post = (p, body, tok = tokenFor(OWNER)) => fetch(`${base}${p}`, { method: "POST", headers: { "Content-Type": "application/json", ...(tok ? { Authorization: `Bearer ${tok}` } : {}) }, body: JSON.stringify(body) });
  return { base, post, chipsMap, jobsMap, enqueued, storage, close: () => server.close() };
}
const PIN = { lat: 67.5, lon: 115 };

test("chip request validates auth, ids, body, footprint and asset availability", async () => {
  const s = routeKit();
  const noAuth = await s.post(`/api/imagery/${ACQ}/chip`, PIN, null);
  const badId = await s.post("/api/imagery/nope/chip", PIN);
  const noBody = await s.post(`/api/imagery/${ACQ}/chip`, { lat: 67.5 });
  const tooBig = await s.post(`/api/imagery/${ACQ}/chip`, { ...PIN, size_px: 5000 });
  const unknown = await s.post("/api/imagery/22222222-2222-4222-8222-222222222222/chip", PIN);
  const outside = await s.post(`/api/imagery/${ACQ}/chip`, { lat: 10, lon: 10 });
  s.close();
  assert.deepEqual([noAuth.status, badId.status, noBody.status, tooBig.status, unknown.status, outside.status], [401, 400, 400, 400, 404, 422]);
  assert.equal((await outside.json()).error.code, "point_outside_scene");
  assert.equal(s.enqueued.length, 0);
  const t = routeKit({ visual_asset_key: null });
  const none = await t.post(`/api/imagery/${ACQ}/chip`, PIN);
  t.close();
  assert.equal(none.status, 422);
  assert.equal((await none.json()).error.code, "no_visual_asset");
});

test("chip request returns 202 with a job, or 200 with the chip if it already exists", async () => {
  const s = routeKit();
  const first = await s.post(`/api/imagery/${ACQ}/chip`, PIN);
  const body = await first.json();
  assert.equal(first.status, 202);
  assert.equal(body.job.status, "queued");
  assert.deepEqual(s.enqueued[0].params, { acquisition_id: ACQ, lon: 115, lat: 67.5, size_px: 512 });
  s.chipsMap.set(`${ACQ}:${chipKey(115, 67.5, 512)}`, { id: "cccccccc-cccc-4ccc-8ccc-cccccccccccc", acquisition_id: ACQ, center_lat: 67.5, center_lon: 115, size_px: 512, width_px: 512, height_px: 512, pin_x: 256, pin_y: 256, bounds: FOOTPRINT, storage_path: "chips/c.png" });
  const again = await s.post(`/api/imagery/${ACQ}/chip`, PIN);
  const againBody = await again.json();
  s.close();
  assert.equal(again.status, 200);
  assert.equal(againBody.job, null);
  assert.equal(againBody.chip.image_url, "/api/chips/cccccccc-cccc-4ccc-8ccc-cccccccccccc/image");
  assert.deepEqual(againBody.chip.pin_px, { x: 256, y: 256 });
  assert.equal(s.enqueued.length, 1);
});

test("jobs are visible to their owner and admins, and hidden from other users", async () => {
  const s = routeKit();
  const { job } = await (await s.post(`/api/imagery/${ACQ}/chip`, PIN)).json();
  const get = (tok) => fetch(`${s.base}/api/jobs/${job.id}`, { headers: tok ? { Authorization: `Bearer ${tok}` } : {} });
  const owner = await get(tokenFor(OWNER));
  const other = await get(tokenFor(OTHER));
  const admin = await get(tokenFor(OTHER, "admin"));
  const anon = await get(null);
  const bad = await fetch(`${s.base}/api/jobs/not-a-uuid`, { headers: { Authorization: `Bearer ${tokenFor(OWNER)}` } });
  s.close();
  assert.deepEqual([owner.status, other.status, admin.status, anon.status, bad.status], [200, 404, 200, 401, 400]);
  assert.equal((await owner.json()).job.status, "queued");
});

test("chip metadata and image are served, and missing files give a clean 404", async () => {
  const s = routeKit();
  const id = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
  s.chipsMap.set("k", { id, acquisition_id: ACQ, center_lat: 1, center_lon: 2, size_px: 512, width_px: 512, height_px: 512, pin_x: 1, pin_y: 1, bounds: FOOTPRINT, storage_path: `chips/${id}.png` });
  fs.mkdirSync(path.join(s.storage.root, "chips"), { recursive: true });
  const png = Buffer.from("89504e470d0a1a0a", "hex");
  fs.writeFileSync(s.storage.resolve(`chips/${id}.png`), png);
  const meta = await fetch(`${s.base}/api/chips/${id}`);
  const img = await fetch(`${s.base}/api/chips/${id}/image`);
  const bytes = Buffer.from(await img.arrayBuffer());
  fs.rmSync(s.storage.resolve(`chips/${id}.png`));
  const gone = await fetch(`${s.base}/api/chips/${id}/image`);
  const unknown = await fetch(`${s.base}/api/chips/dddddddd-dddd-4ddd-8ddd-dddddddddddd`);
  s.close();
  assert.equal(meta.status, 200);
  assert.equal(img.headers.get("content-type"), "image/png");
  assert.deepEqual(bytes, png);
  assert.equal(gone.status, 404);
  assert.equal(unknown.status, 404);
});
