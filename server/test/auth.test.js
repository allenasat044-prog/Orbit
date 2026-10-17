import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { hashPassword, verifyPassword } from "../src/auth/password.js";
import { requireRole } from "../src/auth/middleware.js";
import { EmailTakenError } from "../src/auth/usersRepo.js";

const config = {
  corsOrigin: "http://localhost:5173",
  rateLimitPerMin: 1000,
  authRateLimit: 1000,
  jwtSecret: "x".repeat(40),
  jwtExpiresIn: "1h",
};

function memoryUsers() {
  const rows = [];
  return {
    async findByEmail(email) {
      return rows.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
    },
    async findById(id) {
      return rows.find((u) => u.id === id) ?? null;
    },
    async create({ name, email, passwordHash }) {
      if (rows.some((u) => u.email.toLowerCase() === email.toLowerCase())) throw new EmailTakenError();
      const user = { id: crypto.randomUUID(), name, email, password_hash: passwordHash, role: "user", created_at: new Date().toISOString() };
      rows.push(user);
      return user;
    },
  };
}

async function start(cfg = config) {
  const server = createApp({ config: cfg, checks: {}, providers: new Map(), users: memoryUsers() }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const post = (path, body, headers = {}) =>
    fetch(`${base}${path}`, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
  return { base, post, close: () => server.close() };
}

const valid = { name: "Shanks", email: "Shanks@Example.com", password: "correct-horse" };

test("signup creates a user and returns a token without the password hash", async () => {
  const s = await start();
  const res = await s.post("/api/auth/signup", valid);
  const body = await res.json();
  s.close();
  assert.equal(res.status, 201);
  assert.ok(body.token);
  assert.equal(body.user.email, "shanks@example.com");
  assert.equal(body.user.role, "user");
  assert.equal("password_hash" in body.user, false);
  assert.equal(JSON.stringify(body).includes("scrypt"), false);
});

test("signup rejects a duplicate email regardless of case", async () => {
  const s = await start();
  await s.post("/api/auth/signup", valid);
  const res = await s.post("/api/auth/signup", { ...valid, email: "SHANKS@example.COM" });
  const body = await res.json();
  s.close();
  assert.equal(res.status, 409);
  assert.equal(body.error.code, "email_taken");
});

test("signup validation returns readable messages", async () => {
  const s = await start();
  const short = await (await s.post("/api/auth/signup", { ...valid, password: "short" })).json();
  const noName = await (await s.post("/api/auth/signup", { ...valid, name: "  " })).json();
  const badEmail = await (await s.post("/api/auth/signup", { ...valid, email: "nope" })).json();
  const res = await s.post("/api/auth/signup", {});
  s.close();
  assert.equal(short.error.message, "Password must be at least 8 characters.");
  assert.equal(noName.error.message, "Enter your name.");
  assert.equal(badEmail.error.message, "Enter a valid email address.");
  assert.equal(res.status, 400);
});

test("login succeeds with the right password", async () => {
  const s = await start();
  await s.post("/api/auth/signup", valid);
  const res = await s.post("/api/auth/login", { email: "shanks@example.com", password: valid.password });
  const body = await res.json();
  s.close();
  assert.equal(res.status, 200);
  assert.ok(body.token);
});

test("wrong password and unknown email give the same 401 message", async () => {
  const s = await start();
  await s.post("/api/auth/signup", valid);
  const wrong = await s.post("/api/auth/login", { email: valid.email, password: "wrong-password" });
  const unknown = await s.post("/api/auth/login", { email: "nobody@example.com", password: "wrong-password" });
  const a = await wrong.json();
  const b = await unknown.json();
  s.close();
  assert.equal(wrong.status, 401);
  assert.equal(unknown.status, 401);
  assert.deepEqual(a, b);
});

test("/me requires a valid token", async () => {
  const s = await start();
  const signup = await (await s.post("/api/auth/signup", valid)).json();
  const none = await fetch(`${s.base}/api/auth/me`);
  const good = await fetch(`${s.base}/api/auth/me`, { headers: { Authorization: `Bearer ${signup.token}` } });
  const tampered = await fetch(`${s.base}/api/auth/me`, { headers: { Authorization: `Bearer ${signup.token}x` } });
  const goodBody = await good.json();
  s.close();
  assert.equal(none.status, 401);
  assert.equal(good.status, 200);
  assert.equal(goodBody.user.email, "shanks@example.com");
  assert.equal(tampered.status, 401);
});

test("expired, wrong-secret and alg-none tokens are rejected", async () => {
  const s = await start();
  const signup = await (await s.post("/api/auth/signup", valid)).json();
  const id = signup.user.id;
  const expired = jwt.sign({ role: "user" }, config.jwtSecret, { subject: id, expiresIn: -10 });
  const wrongSecret = jwt.sign({ role: "user" }, "y".repeat(40), { subject: id });
  const none = jwt.sign({ role: "admin" }, "", { algorithm: "none", subject: id });
  const codes = [];
  for (const t of [expired, wrongSecret, none]) {
    codes.push((await fetch(`${s.base}/api/auth/me`, { headers: { Authorization: `Bearer ${t}` } })).status);
  }
  s.close();
  assert.deepEqual(codes, [401, 401, 401]);
});

test("auth endpoints are rate limited with a structured error", async () => {
  const s = await start({ ...config, authRateLimit: 2 });
  const codes = [];
  for (let i = 0; i < 3; i++) codes.push((await s.post("/api/auth/login", { email: "a@b.co", password: "whatever1" })).status);
  const last = await s.post("/api/auth/login", { email: "a@b.co", password: "whatever1" });
  const body = await last.json();
  s.close();
  assert.deepEqual(codes, [401, 401, 429]);
  assert.equal(body.error.code, "rate_limited");
});

test("password hashing verifies correctly and uses unique salts", async () => {
  const a = await hashPassword("secret-pass");
  const b = await hashPassword("secret-pass");
  assert.notEqual(a, b);
  assert.equal(await verifyPassword("secret-pass", a), true);
  assert.equal(await verifyPassword("other-pass", a), false);
  assert.equal(await verifyPassword("secret-pass", "garbage"), false);
});

test("requireRole blocks other roles and unauthenticated requests", () => {
  const run = (auth) => {
    let err;
    requireRole("admin")({ auth }, {}, (e) => (err = e));
    return err;
  };
  assert.equal(run({ userId: "1", role: "user" }).status, 403);
  assert.equal(run(undefined).status, 401);
  assert.equal(run({ userId: "1", role: "admin" }), undefined);
});
