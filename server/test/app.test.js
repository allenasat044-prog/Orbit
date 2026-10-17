import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { ImageryProvider, NotImplementedError } from "../src/providers/base.js";

const config = { corsOrigin: "http://localhost:5173", rateLimitPerMin: 1000 };

class FakeProvider extends ImageryProvider {
  constructor(ok) {
    super({ id: "fake", name: "Fake" });
    this.ok = ok;
  }
  async healthCheck() {
    if (!this.ok) throw new Error("provider outage");
    return { stac_version: "1.0.0" };
  }
}

async function start(checks, providers = new Map()) {
  const server = createApp({ config, checks, providers }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  return { base, close: () => server.close() };
}

test("health returns 200 when every component is ok", async () => {
  const s = await start({ database: async () => ({}), ml_service: async () => ({}) });
  const res = await fetch(`${s.base}/api/health`);
  const body = await res.json();
  s.close();
  assert.equal(res.status, 200);
  assert.equal(body.status, "ok");
  assert.equal(body.components.database.status, "ok");
});

test("health returns 503 and names the failing component", async () => {
  const s = await start({
    database: async () => ({}),
    ml_service: async () => {
      throw new Error("connect ECONNREFUSED");
    },
  });
  const res = await fetch(`${s.base}/api/health`);
  const body = await res.json();
  s.close();
  assert.equal(res.status, 503);
  assert.equal(body.status, "degraded");
  assert.equal(body.components.ml_service.status, "down");
  assert.match(body.components.ml_service.error, /ECONNREFUSED/);
  assert.equal(body.components.database.status, "ok");
});

test("providers endpoint reports an outage without crashing", async () => {
  const s = await start({}, new Map([["fake", new FakeProvider(false)]]));
  const res = await fetch(`${s.base}/api/providers`);
  const body = await res.json();
  s.close();
  assert.equal(res.status, 200);
  assert.equal(body.items[0].id, "fake");
  assert.equal(body.items[0].status, "down");
  assert.equal(body.items[0].error, "provider outage");
});

test("providers endpoint reports a healthy provider", async () => {
  const s = await start({}, new Map([["fake", new FakeProvider(true)]]));
  const body = await (await fetch(`${s.base}/api/providers`)).json();
  s.close();
  assert.equal(body.items[0].status, "ok");
  assert.equal(body.items[0].stac_version, "1.0.0");
});

test("unknown routes return a structured 404", async () => {
  const s = await start({});
  const res = await fetch(`${s.base}/api/nope`);
  const body = await res.json();
  s.close();
  assert.equal(res.status, 404);
  assert.equal(body.error.code, "not_found");
});

test("malformed JSON returns a structured 400", async () => {
  const s = await start({});
  const res = await fetch(`${s.base}/api/health`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{bad",
  });
  const body = await res.json();
  s.close();
  assert.equal(res.status, 400);
  assert.equal(body.error.code, "invalid_json");
});

test("base provider methods fail loudly instead of faking results", async () => {
  const p = new ImageryProvider({ id: "x", name: "X" });
  await assert.rejects(() => p.search(), NotImplementedError);
});
