import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { hashPassword } from "../src/auth/password.js";
import { verifyToken } from "../src/auth/tokens.js";
import { EmailTakenError } from "../src/auth/usersRepo.js";

const config = {
  corsOrigin: "http://localhost:5173",
  publicUrl: "http://localhost:5173",
  rateLimitPerMin: 10000,
  authRateLimit: 10000,
  jwtSecret: "x".repeat(40),
  jwtExpiresIn: "1h",
  googleClientId: "g-id",
  googleClientSecret: "g-secret",
  githubClientId: "gh-id",
  githubClientSecret: "gh-secret",
};

function memoryUsers() {
  const rows = [];
  const identities = [];
  return {
    rows,
    identities,
    async findByEmail(email) { return rows.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null; },
    async findById(id) { return rows.find((u) => u.id === id) ?? null; },
    async create({ name, email, passwordHash }) {
      const user = { id: crypto.randomUUID(), name, email, password_hash: passwordHash, role: "user", created_at: new Date().toISOString() };
      rows.push(user);
      return user;
    },
    async findByOAuth(provider, id) {
      const i = identities.find((x) => x.provider === provider && x.providerUserId === id);
      return i ? rows.find((u) => u.id === i.userId) : null;
    },
    async createOAuthUser({ name, email, provider, providerUserId }) {
      if (rows.some((u) => u.email === email)) throw new EmailTakenError();
      const user = { id: crypto.randomUUID(), name, email, password_hash: null, role: "user", created_at: new Date().toISOString() };
      rows.push(user);
      identities.push({ provider, providerUserId, userId: user.id });
      return user;
    },
    async linkOAuth({ userId, provider, providerUserId, clearPassword }) {
      identities.push({ provider, providerUserId, userId });
      if (clearPassword) rows.find((u) => u.id === userId).password_hash = null;
    },
  };
}

// Pretends to be Google and GitHub. `script` lets each test change what they answer.
function fakeProviders(script = {}) {
  const calls = [];
  const fn = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    const json = (body, status = 200) => ({ ok: status < 400, status, json: async () => body });
    const u = String(url);
    if (u === "https://oauth2.googleapis.com/token") return script.googleToken ?? json({ access_token: "g-token" });
    if (u === "https://openidconnect.googleapis.com/v1/userinfo") return json(script.googleUser ?? { sub: "g-1", email: "Ada@Example.com", email_verified: true, name: "Ada Lovelace" });
    if (u === "https://github.com/login/oauth/access_token") return json(script.githubToken ?? { access_token: "gh-token" });
    if (u === "https://api.github.com/user") return json(script.githubUser ?? { id: 4242, login: "ada-gh", name: null });
    if (u === "https://api.github.com/user/emails") return json(script.githubEmails ?? [{ email: "ada@example.com", primary: true, verified: true }]);
    return json({}, 404);
  };
  fn.calls = calls;
  return fn;
}

async function start({ providers = fakeProviders(), cfg = config, users = memoryUsers() } = {}) {
  const server = createApp({ config: cfg, checks: {}, providers: new Map(), users, oauthFetch: providers }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const get = (path, cookie) => fetch(base + path, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} });
  // Starts a sign-in and returns what the browser would carry into the callback.
  const begin = async (provider) => {
    const res = await get(`/api/auth/oauth/${provider}`);
    const location = new URL(res.headers.get("location"));
    const setCookie = res.headers.get("set-cookie");
    return { res, location, setCookie, cookie: setCookie.split(";")[0], state: location.searchParams.get("state") };
  };
  return { base, get, begin, users, providers, close: () => server.close() };
}

const errorOf = (res) => new URL(res.headers.get("location")).searchParams.get("oauth_error");
const tokenOf = (res) => new URL(res.headers.get("location")).hash.replace("#token=", "");

test("starting Google sign-in redirects with state, PKCE and the right callback address", async () => {
  const s = await start();
  const { res, location, setCookie } = await s.begin("google");
  assert.equal(res.status, 302);
  assert.equal(location.origin + location.pathname, "https://accounts.google.com/o/oauth2/v2/auth");
  assert.equal(location.searchParams.get("client_id"), "g-id");
  assert.equal(location.searchParams.get("redirect_uri"), "http://localhost:5173/api/auth/oauth/google/callback");
  assert.equal(location.searchParams.get("scope"), "openid email profile");
  assert.equal(location.searchParams.get("code_challenge_method"), "S256");
  assert.ok(location.searchParams.get("code_challenge"));
  assert.ok(location.searchParams.get("state").length >= 20);
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);
  assert.match(setCookie, /Path=\/api\/auth\/oauth/);
  assert.equal(location.searchParams.has("client_secret"), false);
  s.close();
});

test("starting GitHub sign-in asks only for profile and email access", async () => {
  const s = await start();
  const { location } = await s.begin("github");
  assert.equal(location.origin + location.pathname, "https://github.com/login/oauth/authorize");
  assert.equal(location.searchParams.get("scope"), "read:user user:email");
  assert.equal(location.searchParams.get("redirect_uri"), "http://localhost:5173/api/auth/oauth/github/callback");
  s.close();
});

test("a provider that is not set up, and an unknown provider, are handled clearly", async () => {
  const s = await start({ cfg: { ...config, googleClientSecret: "" } });
  const res = await s.get("/api/auth/oauth/google");
  assert.equal(res.status, 302);
  assert.match(errorOf(res), /Google sign-in isn't set up/);
  const unknown = await s.get("/api/auth/oauth/facebook");
  assert.equal(unknown.status, 404);
  s.close();
});

test("Google sign-in creates a new account without a password and returns a working token", async () => {
  const s = await start();
  const { cookie, state } = await s.begin("google");
  const res = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`, cookie);
  assert.equal(res.status, 302);
  const loc = new URL(res.headers.get("location"));
  assert.equal(loc.origin + loc.pathname, "http://localhost:5173/auth/callback");
  assert.equal(s.users.rows.length, 1);
  const user = s.users.rows[0];
  assert.equal(user.email, "ada@example.com");
  assert.equal(user.name, "Ada Lovelace");
  assert.equal(user.password_hash, null);
  assert.equal(verifyToken(tokenOf(res), config).userId, user.id);
  // the code was swapped with the secret and the PKCE verifier, server to server
  const exchange = s.providers.calls.find((c) => c.url === "https://oauth2.googleapis.com/token");
  const form = exchange.init.body;
  assert.equal(form.get("client_secret"), "g-secret");
  assert.equal(form.get("code"), "abc");
  assert.ok(form.get("code_verifier"));
  // and the state cookie is cleared
  assert.match(res.headers.get("set-cookie"), /orbit_oauth=;/);
  s.close();
});

test("the token works on /me", async () => {
  const s = await start();
  const { cookie, state } = await s.begin("google");
  const res = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`, cookie);
  const me = await fetch(`${s.base}/api/auth/me`, { headers: { Authorization: `Bearer ${tokenOf(res)}` } });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).user.email, "ada@example.com");
  s.close();
});

test("signing in again with the same Google account reuses the account", async () => {
  const s = await start();
  for (let i = 0; i < 2; i++) {
    const { cookie, state } = await s.begin("google");
    const res = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`, cookie);
    assert.ok(tokenOf(res));
  }
  assert.equal(s.users.rows.length, 1);
  assert.equal(s.users.identities.length, 1);
  s.close();
});

test("GitHub sign-in uses the first verified email when the primary one is unverified, and the login name when there is no name", async () => {
  const providers = fakeProviders({
    githubEmails: [
      { email: "old@example.com", primary: false, verified: true },
      { email: "unverified@example.com", primary: true, verified: false },
      { email: "main@example.com", primary: false, verified: true },
    ],
  });
  const s = await start({ providers });
  const { cookie, state } = await s.begin("github");
  const res = await s.get(`/api/auth/oauth/github/callback?code=abc&state=${state}`, cookie);
  assert.ok(tokenOf(res));
  assert.equal(s.users.rows[0].email, "old@example.com");
  assert.equal(s.users.rows[0].name, "ada-gh");
  s.close();
});

test("an existing password account is linked by its verified email, and its password is removed", async () => {
  const users = memoryUsers();
  const existing = await users.create({ name: "Ada", email: "ada@example.com", passwordHash: await hashPassword("old-password-1") });
  const s = await start({ users });
  const { cookie, state } = await s.begin("google");
  const res = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`, cookie);
  assert.equal(verifyToken(tokenOf(res), config).userId, existing.id);
  assert.equal(users.rows.length, 1);
  assert.equal(existing.password_hash, null);
  assert.equal(users.identities.length, 1);
  const login = await fetch(`${s.base}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "ada@example.com", password: "old-password-1" }) });
  assert.equal(login.status, 401);
  s.close();
});

test("a Google account with the same email as a GitHub one joins the same account", async () => {
  const s = await start();
  for (const provider of ["google", "github"]) {
    const { cookie, state } = await s.begin(provider);
    await s.get(`/api/auth/oauth/${provider}/callback?code=abc&state=${state}`, cookie);
  }
  assert.equal(s.users.rows.length, 1);
  assert.equal(s.users.identities.length, 2);
  s.close();
});

test("a wrong state, a missing cookie, or another provider's cookie is rejected without making an account", async () => {
  const s = await start();
  const g = await s.begin("google");
  const wrongState = await s.get(`/api/auth/oauth/google/callback?code=abc&state=forged`, g.cookie);
  assert.match(errorOf(wrongState), /could not be verified/);
  const noCookie = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${g.state}`);
  assert.match(errorOf(noCookie), /took too long|another browser/);
  const gh = await s.begin("github");
  const crossed = await s.get(`/api/auth/oauth/github/callback?code=abc&state=${g.state}`, gh.cookie);
  assert.match(errorOf(crossed), /could not be verified/);
  const tampered = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${g.state}`, g.cookie.slice(0, -3) + "abc");
  assert.match(errorOf(tampered), /took too long|another browser/);
  assert.equal(s.users.rows.length, 0);
  assert.equal(s.providers.calls.length, 0);
  s.close();
});

test("cancelling at the provider gives a friendly message", async () => {
  const s = await start();
  const { cookie } = await s.begin("github");
  const res = await s.get(`/api/auth/oauth/github/callback?error=access_denied`, cookie);
  assert.equal(errorOf(res), "Sign-in was cancelled.");
  s.close();
});

test("an unverified email, or no email at all, cannot sign in", async () => {
  let s = await start({ providers: fakeProviders({ googleUser: { sub: "g-2", email: "x@example.com", email_verified: false, name: "X" } }) });
  let b = await s.begin("google");
  assert.match(errorOf(await s.get(`/api/auth/oauth/google/callback?code=abc&state=${b.state}`, b.cookie)), /verified email/);
  assert.equal(s.users.rows.length, 0);
  s.close();
  s = await start({ providers: fakeProviders({ githubEmails: [{ email: "a@b.co", primary: true, verified: false }] }) });
  b = await s.begin("github");
  assert.match(errorOf(await s.get(`/api/auth/oauth/github/callback?code=abc&state=${b.state}`, b.cookie)), /verified email/);
  s.close();
});

test("provider failures become friendly errors, never a crash or a token", async () => {
  const bad = { ok: false, status: 400, json: async () => ({}) };
  let s = await start({ providers: fakeProviders({ googleToken: bad }) });
  let b = await s.begin("google");
  let res = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${b.state}`, b.cookie);
  assert.match(errorOf(res), /refused the request/);
  assert.equal(res.headers.get("location").includes("token="), false);
  s.close();
  s = await start({ providers: fakeProviders({ githubToken: { error: "bad_verification_code" } }) });
  b = await s.begin("github");
  res = await s.get(`/api/auth/oauth/github/callback?code=abc&state=${b.state}`, b.cookie);
  assert.match(errorOf(res), /did not accept/);
  s.close();
  s = await start({ providers: async () => { throw new Error("network down"); } });
  b = await s.begin("google");
  res = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${b.state}`, b.cookie);
  assert.match(errorOf(res), /Could not reach/);
  s.close();
});

test("a state can be used only once", async () => {
  const s = await start();
  const { cookie, state } = await s.begin("google");
  const first = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`, cookie);
  assert.ok(tokenOf(first));
  // the browser dropped the cleared cookie, so replaying the URL finds none
  const replay = await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`);
  assert.ok(errorOf(replay));
  s.close();
});

test("password login for an account that only has Google/GitHub sign-in fails like any wrong password", async () => {
  const s = await start();
  const { cookie, state } = await s.begin("google");
  await s.get(`/api/auth/oauth/google/callback?code=abc&state=${state}`, cookie);
  const login = await fetch(`${s.base}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "ada@example.com", password: "anything-at-all" }) });
  assert.equal(login.status, 401);
  assert.equal((await login.json()).error.message, "Invalid email or password.");
  s.close();
});
