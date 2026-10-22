import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { createCompareHandler } from "../src/comparisons/job.js";
import { createComparisonRouter, publicComparison } from "../src/comparisons/routes.js";
import { JobError } from "../src/imagery/chipJob.js";

const CHIP = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const USER = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const config = { corsOrigin: "x", rateLimitPerMin: 1000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };
const tok = () => jwt.sign({ role: "user" }, config.jwtSecret, { subject: USER });

const MODELS = [
  { id: "smolvlm-instruct", name: "SmolVLM", tasks: ["caption", "vqa"], available: true },
  { id: "second-vlm", name: "Second VLM", tasks: ["caption"], available: true },
  { id: "rs-llava-7b", name: "RS-LLaVA", tasks: ["caption"], available: false, unavailable_reason: "Needs a CUDA GPU." },
  { id: "terrascope-8b", name: "TerraScope", tasks: ["pixel-grounded-reasoning"], available: false, unavailable_reason: "Too big." },
  { id: "georsclip-vit-b-32", name: "GeoRSCLIP", tasks: ["embed", "classify", "score"], available: true },
];

function kit({ models = MODELS, captionFor = {}, classifyImpl, scoreImpl, listFails } = {}) {
  const stored = [];
  const rows = new Map();
  const calls = { caption: [], classify: [], score: [] };
  const chips = { findById: async (id) => (id === CHIP ? { id: CHIP, storage_path: `chips/${CHIP}.png` } : null) };
  const captions = { findById: async (id) => rows.get(id) };
  const captionHandler = async ({ model_id }) => {
    calls.caption.push(model_id);
    const f = captionFor[model_id];
    if (f instanceof Error) throw f;
    const id = crypto.randomUUID();
    rows.set(id, { id, checkpoint: `ckpt/${model_id}`, caption: f ?? `caption by ${model_id}`, latency_ms: 100, device: "mps" });
    return { caption_id: id, reused: false };
  };
  const comparisons = { insert: async (c) => { const row = { id: crypto.randomUUID(), ...c }; stored.push(row); return row; } };
  const handler = createCompareHandler({
    chips, captions, captionHandler, comparisons,
    listModels: async () => { if (listFails) throw listFails; return { items: models }; },
    classify: classifyImpl ?? (async (b) => { calls.classify.push(b); return { labels: [{ label: "farmland", score: 0.6 }, { label: "forest", score: 0.2 }], model_id: "georsclip-vit-b-32", checkpoint: "Zilun/GeoRSCLIP:ckpt/RS5M_ViT-B-32.pt", device: "mps" }; }),
    score: scoreImpl ?? (async (b) => { calls.score.push(b); return { scores: b.texts.map((t, i) => ({ text: t, similarity: 0.3 - i * 0.05 })) }; }),
  });
  return { handler, stored, calls };
}

test("compare runs every available caption model, lists unavailable ones with reasons, and adds scene tags and alignment", async () => {
  const k = kit();
  const out = await k.handler({ chip_id: CHIP }, { userId: USER });
  const saved = k.stored[0];
  assert.equal(out.comparison_id, saved.id);
  assert.deepEqual(k.calls.caption, ["smolvlm-instruct", "second-vlm"]);
  assert.deepEqual(saved.results.map((r) => [r.model_id, r.text, r.alignment]), [["smolvlm-instruct", "caption by smolvlm-instruct", 0.3], ["second-vlm", "caption by second-vlm", 0.25]]);
  assert.deepEqual(saved.unavailable, [{ model_id: "rs-llava-7b", name: "RS-LLaVA", reason: "Needs a CUDA GPU." }]);
  assert.deepEqual(saved.scene_tags[0], { label: "farmland", score: 0.6 });
  assert.equal(saved.scene_model.id, "georsclip-vit-b-32");
  assert.equal(saved.scene_error, null);
  assert.equal(saved.created_by, USER);
  assert.deepEqual(k.calls.classify[0], { image_path: `chips/${CHIP}.png`, model_id: "georsclip-vit-b-32", top_k: 5 });
  assert.deepEqual(k.calls.score[0].texts, ["caption by smolvlm-instruct", "caption by second-vlm"]);
});

test("a model that fails is reported next to the ones that worked, and the comparison still completes", async () => {
  const k = kit({ captionFor: { "second-vlm": new JobError("model_error", "generation crashed") } });
  await k.handler({ chip_id: CHIP }, {});
  const [a, b] = k.stored[0].results;
  assert.equal(a.text, "caption by smolvlm-instruct");
  assert.deepEqual(b.error, { code: "model_error", message: "generation crashed" });
  assert.equal(b.alignment, undefined);
  assert.deepEqual(k.calls.score[0].texts, ["caption by smolvlm-instruct"]);
});

test("model_ids limits the comparison and unknown ids are rejected", async () => {
  const k = kit();
  await k.handler({ chip_id: CHIP, model_ids: ["smolvlm-instruct"] }, {});
  assert.deepEqual(k.calls.caption, ["smolvlm-instruct"]);
  assert.deepEqual(k.stored[0].unavailable, []);
  await assert.rejects(() => kit().handler({ chip_id: CHIP, model_ids: ["nope"] }, {}), (e) => e.code === "unknown_model");
});

test("without a scene-tag model the captions are still compared and the reason is recorded", async () => {
  const noClip = MODELS.map((m) => (m.id === "georsclip-vit-b-32" ? { ...m, available: false, unavailable_reason: "Missing Python packages: open_clip_torch" } : m));
  const k = kit({ models: noClip });
  await k.handler({ chip_id: CHIP }, {});
  const saved = k.stored[0];
  assert.equal(saved.scene_tags, null);
  assert.match(saved.scene_error.message, /open_clip_torch/);
  assert.equal(k.calls.classify.length, 0);
  assert.equal(saved.results[0].alignment, null);
});

test("if scene tagging fails mid-way the captions are kept and the failure is recorded", async () => {
  const k = kit({ classifyImpl: async () => { throw Object.assign(new Error("ML down"), { code: "ml_service_unavailable", retryable: true }); } });
  await k.handler({ chip_id: CHIP }, {});
  assert.deepEqual(k.stored[0].scene_error, { code: "ml_service_unavailable", message: "ML down" });
  assert.equal(k.stored[0].results.length, 2);
});

test("compare fails clearly when no caption model works, the chip is missing, or the ML service is down", async () => {
  const none = MODELS.map((m) => (m.tasks.includes("caption") ? { ...m, available: false, unavailable_reason: `${m.name} offline` } : m));
  await assert.rejects(() => kit({ models: none }).handler({ chip_id: CHIP }, {}), (e) => e.code === "no_caption_model" && /SmolVLM offline/.test(e.message) && !e.retryable);
  await assert.rejects(() => kit().handler({ chip_id: "22222222-2222-4222-8222-222222222222" }, {}), (e) => e.code === "chip_not_found");
  await assert.rejects(() => kit({ listFails: Object.assign(new Error("unreachable"), { code: "ml_service_unavailable", retryable: true }) }).handler({ chip_id: CHIP }, {}), (e) => e.code === "ml_service_unavailable" && e.retryable === true);
  const allFail = kit({ models: MODELS.filter((m) => m.id === "smolvlm-instruct" || m.id === "georsclip-vit-b-32"), captionFor: { "smolvlm-instruct": new JobError("model_unavailable", "no weights") } });
  await assert.rejects(() => allFail.handler({ chip_id: CHIP }, {}), (e) => e.code === "model_unavailable" && /no weights/.test(e.message));
  assert.equal(allFail.stored.length, 0);
});

function routes() {
  const enqueued = [];
  const rows = new Map();
  const server = createApp({
    config, checks: {}, providers: new Map(),
    routers: [{ path: "/api", router: createComparisonRouter({
      config,
      chips: { findById: async (id) => (id === CHIP ? { id: CHIP } : null) },
      comparisons: { findById: async (id) => rows.get(id) ?? null },
      runner: { enqueue: async (type, params, userId) => { const j = { id: crypto.randomUUID(), type, params, status: "queued", attempts: 0, created_by: userId }; enqueued.push(j); return j; } },
    }) }],
  }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const post = (body, t = tok()) => fetch(`${base}/api/captions/compare-models`, { method: "POST", headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) }, body: JSON.stringify(body) });
  return { base, post, enqueued, rows, close: () => server.close() };
}

test("POST /captions/compare-models validates, needs login, and returns a job", async () => {
  const s = routes();
  const anon = await s.post({ chip_id: CHIP }, null);
  const noBody = await s.post({});
  const badModels = await s.post({ chip_id: CHIP, model_ids: [] });
  const unknown = await s.post({ chip_id: "22222222-2222-4222-8222-222222222222" });
  const ok = await s.post({ chip_id: CHIP, model_ids: ["smolvlm-instruct"] });
  const body = await ok.json();
  s.close();
  assert.deepEqual([anon.status, noBody.status, badModels.status, unknown.status, ok.status], [401, 400, 400, 404, 202]);
  assert.equal(body.job.type, "compare_models");
  assert.deepEqual(s.enqueued[0].params, { chip_id: CHIP, model_ids: ["smolvlm-instruct"] });
});

test("GET /comparisons/:id serves the saved comparison with its caveat, and validates ids", async () => {
  const s = routes();
  const id = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
  s.rows.set(id, { id, chip_id: CHIP, created_at: "2026-10-21T00:00:00Z", results: [{ model_id: "m", text: "t", alignment: 0.3 }], scene_tags: [{ label: "farmland", score: 0.6 }], scene_model: { id: "g" }, scene_error: null, unavailable: [] });
  const ok = await (await fetch(`${s.base}/api/comparisons/${id}`)).json();
  const missing = await fetch(`${s.base}/api/comparisons/eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee`);
  const bad = await fetch(`${s.base}/api/comparisons/nope`);
  s.close();
  assert.equal(ok.comparison.results[0].alignment, 0.3);
  assert.equal(ok.comparison.image_url, `/api/chips/${CHIP}/image`);
  assert.equal(ok.comparison.ai_generated, true);
  assert.match(ok.comparison.note, /not a measure of truth/);
  assert.equal("created_by" in ok.comparison, false);
  assert.deepEqual([missing.status, bad.status], [404, 400]);
  assert.equal(publicComparison({ id, chip_id: CHIP, results: [] }).chip_id, CHIP);
});
