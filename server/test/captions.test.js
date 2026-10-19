import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import http from "node:http";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { createCaptionHandler } from "../src/captions/job.js";
import { createCaptionRouter, publicCaption } from "../src/captions/routes.js";
import { promptKey } from "../src/captions/repo.js";
import { createJobRunner } from "../src/jobs/runner.js";
import { JobError } from "../src/imagery/chipJob.js";
import { mlRequest, mlCaption } from "../src/mlClient.js";

const CHIP = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const ACQ = "11111111-1111-4111-8111-111111111111";
const USER = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const config = { corsOrigin: "x", rateLimitPerMin: 1000, authRateLimit: 1000, searchRateLimit: 1000, captionRateLimit: 1000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };
const tok = () => jwt.sign({ role: "user" }, config.jwtSecret, { subject: USER });

const ML = { text: "Green fields with a road.", model_id: "smolvlm-instruct", checkpoint: "HuggingFaceTB/SmolVLM-Instruct", revision: "abc", device: "mps", dtype: "bfloat16", prompt: "P", latency_ms: 1234 };

function kit(over = {}) {
  const rows = new Map();
  const calls = [];
  const chips = { findById: async (id) => (id === CHIP ? { id: CHIP, acquisition_id: ACQ, storage_path: `chips/${CHIP}.png` } : null) };
  const captions = {
    find: async (c, m, k) => rows.get(`${c}:${m}:${k}`) ?? null,
    findById: async (id) => [...rows.values()].find((r) => r.id === id) ?? null,
    insert: async (c) => {
      const key = `${c.chip_id}:${c.model_id}:${c.prompt_key}`;
      if (rows.has(key)) return { caption: rows.get(key), created: false };
      const row = { id: crypto.randomUUID(), ...c, created_at: "2026-10-18T00:00:00Z" };
      rows.set(key, row);
      return { caption: row, created: true };
    },
  };
  const mlCap = over.mlCaption ?? (async (body) => { calls.push(body); return ML; });
  return { chips, captions, rows, calls, handler: createCaptionHandler({ chips, captions, mlCaption: mlCap }) };
}

test("caption job sends the chip image to the model and stores full provenance", async () => {
  const k = kit();
  const r = await k.handler({ chip_id: CHIP }, { userId: USER });
  assert.equal(r.reused, false);
  assert.deepEqual(k.calls[0], { image_path: `chips/${CHIP}.png`, model_id: "smolvlm-instruct", prompt: undefined });
  const row = k.rows.values().next().value;
  assert.equal(row.chip_id, CHIP);
  assert.equal(row.acquisition_id, ACQ);
  assert.equal(row.caption, ML.text);
  assert.deepEqual([row.checkpoint, row.revision, row.device, row.dtype, row.latency_ms, row.created_by], [ML.checkpoint, "abc", "mps", "bfloat16", 1234, USER]);
});

test("caption job is idempotent per chip, model and prompt", async () => {
  const k = kit();
  const a = await k.handler({ chip_id: CHIP });
  const b = await k.handler({ chip_id: CHIP });
  const c = await k.handler({ chip_id: CHIP, prompt: "What crops?" });
  assert.equal(k.calls.length, 2);
  assert.equal(b.caption_id, a.caption_id);
  assert.equal(b.reused, true);
  assert.notEqual(c.caption_id, a.caption_id);
  assert.equal(promptKey(null), "default");
  assert.notEqual(promptKey("a"), promptKey("b"));
});

test("caption job fails clearly for a missing chip and passes model errors through with the right retry flag", async () => {
  await assert.rejects(() => kit().handler({ chip_id: "22222222-2222-4222-8222-222222222222" }), (e) => e.code === "chip_not_found" && !e.retryable);
  const unavailable = kit({ mlCaption: async () => { throw Object.assign(new Error("weights missing"), { code: "model_unavailable", retryable: false }); } });
  await assert.rejects(() => unavailable.handler({ chip_id: CHIP }), (e) => e instanceof JobError && e.code === "model_unavailable" && e.retryable === false && /weights missing/.test(e.message));
  const down = kit({ mlCaption: async () => { throw Object.assign(new Error("ML down"), { code: "ml_service_unavailable", retryable: true }); } });
  await assert.rejects(() => down.handler({ chip_id: CHIP }), (e) => e.code === "ml_service_unavailable" && e.retryable === true);
  assert.equal(down.rows.size, 0);
});

// ---- ML client ----
async function mlServer(handler) {
  const s = http.createServer(handler).listen(0);
  return { url: `http://localhost:${s.address().port}`, close: () => s.close() };
}

test("ML client: model_unavailable and model_error are not retryable, other 5xx are, network failures are", async () => {
  const mk = (status, code) => mlServer((_q, res) => { res.writeHead(status, { "Content-Type": "application/json" }); res.end(JSON.stringify({ error: { code, message: `m-${code}` } })); });
  const a = await mk(503, "model_unavailable");
  const b = await mk(500, "model_error");
  const c = await mk(502, "bad_gateway");
  const d = await mk(422, "unsupported_input");
  const e1 = await mlCaption(a.url, {}).catch((e) => e);
  const e2 = await mlCaption(b.url, {}).catch((e) => e);
  const e3 = await mlCaption(c.url, {}).catch((e) => e);
  const e4 = await mlCaption(d.url, {}).catch((e) => e);
  [a, b, c, d].forEach((s) => s.close());
  assert.deepEqual([e1.code, e1.retryable, e1.message], ["model_unavailable", false, "m-model_unavailable"]);
  assert.equal(e2.retryable, false);
  assert.equal(e3.retryable, true);
  assert.equal(e4.retryable, false);
  const down = await mlRequest("http://localhost:1", "/x", { timeoutMs: 500 }).catch((e) => e);
  assert.deepEqual([down.code, down.retryable], ["ml_service_unavailable", true]);
});

// ---- routes ----
function routes(over = {}) {
  const k = kit();
  const enqueued = [];
  const server = createApp({
    config, checks: {}, providers: new Map(),
    routers: [{ path: "/api", router: createCaptionRouter({
      config, chips: k.chips, captions: k.captions,
      runner: { enqueue: async (type, params, userId) => { const j = { id: crypto.randomUUID(), type, params, status: "queued", attempts: 0, created_by: userId }; enqueued.push(j); return j; } },
      ml: over.ml ?? { models: async () => ({ items: [{ id: "smolvlm-instruct", available: true }] }), model: async (id) => { if (id === "nope") throw Object.assign(new Error("Unknown model"), { code: "unknown_model", status: 404 }); return { id }; } },
    }) }],
  }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const post = (body, t = tok()) => fetch(`${base}/api/captions`, { method: "POST", headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) }, body: JSON.stringify(body) });
  return { base, post, k, enqueued, close: () => server.close() };
}

test("POST /captions validates, requires auth, and returns 202 with a job", async () => {
  const s = routes();
  const noAuth = await s.post({ chip_id: CHIP }, null);
  const noBody = await s.post({});
  const badId = await s.post({ chip_id: "nope" });
  const unknown = await s.post({ chip_id: "22222222-2222-4222-8222-222222222222" });
  const ok = await s.post({ chip_id: CHIP });
  const body = await ok.json();
  s.close();
  assert.deepEqual([noAuth.status, noBody.status, badId.status, unknown.status, ok.status], [401, 400, 400, 404, 202]);
  assert.equal(body.job.type, "generate_caption");
  assert.deepEqual(s.enqueued[0].params, { chip_id: CHIP, model_id: "smolvlm-instruct", prompt: null });
});

test("POST /captions returns the stored caption instantly when it already exists, and GET serves it with provenance", async () => {
  const s = routes();
  await s.k.handler({ chip_id: CHIP }, { userId: USER });
  const again = await s.post({ chip_id: CHIP });
  const body = await again.json();
  const got = await (await fetch(`${s.base}/api/captions/${body.caption.id}`)).json();
  const missing = await fetch(`${s.base}/api/captions/dddddddd-dddd-4ddd-8ddd-dddddddddddd`);
  const bad = await fetch(`${s.base}/api/captions/xyz`);
  s.close();
  assert.equal(again.status, 200);
  assert.equal(body.job, null);
  assert.equal(s.enqueued.length, 0);
  assert.equal(got.caption.caption, ML.text);
  assert.equal(got.caption.ai_generated, true);
  assert.deepEqual(got.caption.model, { id: "smolvlm-instruct", checkpoint: ML.checkpoint, revision: "abc", device: "mps", dtype: "bfloat16" });
  assert.equal(got.caption.image_url, `/api/chips/${CHIP}/image`);
  assert.equal(missing.status, 404);
  assert.equal(bad.status, 400);
  assert.equal(publicCaption(got.caption && { ...got.caption, model_id: "x", checkpoint: "y", chip_id: CHIP }).model.id, "x");
});

test("GET /models proxies the ML service and maps its failures", async () => {
  const s = routes();
  const list = await (await fetch(`${s.base}/api/models`)).json();
  const one = await fetch(`${s.base}/api/models/smolvlm-instruct`);
  const unknown = await fetch(`${s.base}/api/models/nope`);
  s.close();
  assert.equal(list.items[0].id, "smolvlm-instruct");
  assert.equal(one.status, 200);
  assert.equal(unknown.status, 404);
  assert.equal((await unknown.json()).error.code, "unknown_model");
  const down = routes({ ml: { models: async () => { throw Object.assign(new Error("ML down"), { code: "ml_service_unavailable" }); }, model: async () => ({}) } });
  const r = await fetch(`${down.base}/api/models`);
  down.close();
  assert.equal(r.status, 502);
});

test("caption jobs run through the real job runner and record unavailable models as failed jobs", async () => {
  const rows = new Map();
  const repo = {
    create: async ({ type, params, userId }) => { const j = { id: crypto.randomUUID(), type, params, status: "queued", attempts: 0, created_by: userId }; rows.set(j.id, j); return j; },
    get: async (id) => rows.get(id), markRunning: async (id) => Object.assign(rows.get(id), { status: "running", attempts: rows.get(id).attempts + 1 }),
    markSucceeded: async (id, result) => Object.assign(rows.get(id), { status: "succeeded", result }), markFailed: async (id, error) => Object.assign(rows.get(id), { status: "failed", error }),
    requeue: async (id) => Object.assign(rows.get(id), { status: "queued" }), recoverInterrupted: async () => {}, listQueued: async () => [],
  };
  const k = kit({ mlCaption: async () => { throw Object.assign(new Error("Not runnable on this machine"), { code: "model_unavailable", retryable: false }); } });
  const runner = createJobRunner({ repo, handlers: { generate_caption: k.handler }, logger: { error() {} } });
  const j = await runner.enqueue("generate_caption", { chip_id: CHIP, model_id: "rs-llava-7b" }, USER);
  for (let i = 0; i < 100 && !runner.idle(); i++) await new Promise((r) => setTimeout(r, 5));
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(rows.get(j.id).status, "failed");
  assert.equal(rows.get(j.id).attempts, 1);
  assert.deepEqual(rows.get(j.id).error, { code: "model_unavailable", message: "Not runnable on this machine" });
});

// ---- list + delete ----
const OTHER = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const tokFor = (id, role = "user") => jwt.sign({ role }, config.jwtSecret, { subject: id });

function listKit(rowsIn) {
  const rows = rowsIn.map((r, i) => ({ chip_id: CHIP, acquisition_id: ACQ, model_id: "m", checkpoint: "ck", revision: "r", device: "mps", dtype: "bf16", prompt: "P", caption: `cap ${i}`, latency_ms: 10, created_at: "2026-10-19T00:00:00Z", acquired_at: "2026-10-14T05:00:00Z", platform: "sentinel-2c", scene_id: "S2C_X", center_lat: 28.6, center_lon: 77.2, size_px: 128, gsd_m: 10, ...r }));
  const removed = [];
  const captions = {
    findById: async (id) => rows.find((r) => r.id === id) ?? null,
    find: async () => null,
    remove: async (id) => { removed.push(id); return true; },
    listForUser: async (userId, { limit, after }) => {
      const mine = rows.filter((r) => r.created_by === userId).sort((a, b) => (a.created_at_raw < b.created_at_raw ? 1 : -1));
      const start = after ? mine.findIndex((r) => r.id === after.id) + 1 : 0;
      return mine.slice(start, start + limit);
    },
  };
  const server = createApp({ config, checks: {}, providers: new Map(), routers: [{ path: "/api", router: createCaptionRouter({ config, chips: {}, captions, runner: {}, ml: {} }) }] }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  return { base, removed, close: () => server.close() };
}
const uid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const ts = (n) => `2026-10-19 10:00:0${n}.123456+00`;

test("GET /captions lists only my captions, newest first, with scene and location details", async () => {
  const s = listKit([
    { id: uid(1), created_by: USER, created_at_raw: ts(1) },
    { id: uid(2), created_by: USER, created_at_raw: ts(3) },
    { id: uid(3), created_by: OTHER, created_at_raw: ts(2) },
    { id: uid(4), created_by: USER, created_at_raw: ts(2) },
  ]);
  const anon = await fetch(`${s.base}/api/captions`);
  const res = await fetch(`${s.base}/api/captions`, { headers: { Authorization: `Bearer ${tokFor(USER)}` } });
  const body = await res.json();
  s.close();
  assert.equal(anon.status, 401);
  assert.deepEqual(body.items.map((i) => i.id), [uid(2), uid(4), uid(1)]);
  assert.equal(body.next_cursor, null);
  const first = body.items[0];
  assert.deepEqual(first.scene, { id: "S2C_X", acquired_at: "2026-10-14T05:00:00Z", platform: "sentinel-2c" });
  assert.deepEqual(first.location, { lat: 28.6, lon: 77.2 });
  assert.equal(first.image_url, `/api/chips/${CHIP}/image`);
  assert.equal(first.ai_generated, true);
  assert.equal("created_at_raw" in first, false);
  assert.equal("created_by" in first, false);
});

test("GET /captions paginates with an opaque cursor and rejects bad input", async () => {
  const s = listKit([1, 2, 3].map((n) => ({ id: uid(n), created_by: USER, created_at_raw: ts(n) })));
  const h = { headers: { Authorization: `Bearer ${tokFor(USER)}` } };
  const p1 = await (await fetch(`${s.base}/api/captions?limit=2`, h)).json();
  const p2 = await (await fetch(`${s.base}/api/captions?limit=2&cursor=${p1.next_cursor}`, h)).json();
  const badCursor = await fetch(`${s.base}/api/captions?cursor=garbage`, h);
  const evil = Buffer.from(JSON.stringify({ t: "x'; drop table captions;--", id: uid(1) })).toString("base64url");
  const sqlish = await fetch(`${s.base}/api/captions?cursor=${evil}`, h);
  const badLimit = await fetch(`${s.base}/api/captions?limit=500`, h);
  s.close();
  assert.deepEqual(p1.items.map((i) => i.id), [uid(3), uid(2)]);
  assert.ok(p1.next_cursor);
  assert.deepEqual(p2.items.map((i) => i.id), [uid(1)]);
  assert.equal(p2.next_cursor, null);
  assert.deepEqual([badCursor.status, sqlish.status, badLimit.status], [400, 400, 400]);
});

test("DELETE /captions/:id works for the owner and admins, and hides other people's captions", async () => {
  const s = listKit([{ id: uid(1), created_by: USER, created_at_raw: ts(1) }]);
  const del = (tok, id = uid(1)) => fetch(`${s.base}/api/captions/${id}`, { method: "DELETE", headers: tok ? { Authorization: `Bearer ${tok}` } : {} });
  const anon = await del(null);
  const other = await del(tokFor(OTHER));
  const missing = await del(tokFor(USER), uid(9));
  const bad = await del(tokFor(USER), "nope");
  const owner = await del(tokFor(USER));
  const admin = await del(tokFor(OTHER, "admin"));
  s.close();
  assert.deepEqual([anon.status, other.status, missing.status, bad.status, owner.status, admin.status], [401, 404, 404, 400, 204, 204]);
  assert.deepEqual(s.removed, [uid(1), uid(1)]);
});
