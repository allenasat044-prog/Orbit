import crypto from "node:crypto";
import express from "express";
import jwt from "jsonwebtoken";
import { signToken } from "./tokens.js";
import { EmailTakenError } from "./usersRepo.js";

// "Continue with Google / GitHub": the standard authorization-code flow, done on the server.
//   1. GET  /oauth/:provider           -> send the browser to the provider (with a one-time state)
//   2. GET  /oauth/:provider/callback  -> check the state, swap the code for the person's identity,
//                                         find or create the account, hand our own token to the page.
// Our client secrets never reach the browser, and the token travels in the URL fragment
// (the part after #), which browsers do not send to servers.

const STATE_COOKIE = "orbit_oauth";
const STATE_TTL_SECONDS = 600;

class OAuthFailure extends Error {
  constructor(message) {
    super(message);
    this.name = "OAuthFailure";
  }
}

const providers = {
  google: {
    name: "Google",
    pkce: true,
    credentials: (c) => ({ id: c.googleClientId, secret: c.googleClientSecret }),
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    extraAuthorizeParams: { scope: "openid email profile", response_type: "code", prompt: "select_account" },
    async identity(fetchJson, { clientId, clientSecret, redirectUri, code, verifier }) {
      const token = await fetchJson("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code", code_verifier: verifier }),
      });
      if (!token.access_token) throw new OAuthFailure("Google did not accept the sign-in. Please try again.");
      const me = await fetchJson("https://openidconnect.googleapis.com/v1/userinfo", { headers: { Authorization: `Bearer ${token.access_token}` } });
      return { providerUserId: me.sub, email: me.email, emailVerified: me.email_verified === true, name: me.name };
    },
  },
  github: {
    name: "GitHub",
    pkce: false,
    credentials: (c) => ({ id: c.githubClientId, secret: c.githubClientSecret }),
    authorizeUrl: "https://github.com/login/oauth/authorize",
    extraAuthorizeParams: { scope: "read:user user:email", allow_signup: "true" },
    async identity(fetchJson, { clientId, clientSecret, redirectUri, code }) {
      const token = await fetchJson("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
      });
      if (!token.access_token) throw new OAuthFailure("GitHub did not accept the sign-in. Please try again.");
      const headers = { Authorization: `Bearer ${token.access_token}`, Accept: "application/vnd.github+json", "User-Agent": "orbit-eo", "X-GitHub-Api-Version": "2022-11-28" };
      const me = await fetchJson("https://api.github.com/user", { headers });
      const emails = await fetchJson("https://api.github.com/user/emails", { headers });
      const verified = Array.isArray(emails) ? emails.filter((e) => e && e.verified && e.email) : [];
      const best = verified.find((e) => e.primary) ?? verified[0];
      return { providerUserId: me.id, email: best?.email, emailVerified: Boolean(best), name: me.name || me.login };
    },
  },
};

const readCookie = (req, name) =>
  (req.headers.cookie ?? "").split(";").map((s) => s.trim()).find((s) => s.startsWith(`${name}=`))?.slice(name.length + 1);

const sha256Base64Url = (s) => crypto.createHash("sha256").update(s).digest("base64url");
const same = (a, b) => typeof a === "string" && typeof b === "string" && a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));

export function createOAuthRouter({ config, users, fetchFn = fetch }) {
  const router = express.Router();
  const publicUrl = String(config.publicUrl ?? "http://localhost:5173").replace(/\/+$/, "");
  const secure = publicUrl.startsWith("https://");
  const cookieOptions = { httpOnly: true, sameSite: "lax", secure, path: "/api/auth/oauth" };
  const fail = (res, message) => res.redirect(`${publicUrl}/login?oauth_error=${encodeURIComponent(message)}`);
  const callbackUrl = (key) => `${publicUrl}/api/auth/oauth/${key}/callback`;

  const fetchJson = async (url, init) => {
    let res;
    try {
      res = await fetchFn(url, { ...init, signal: AbortSignal.timeout(config.providerTimeoutMs ?? 10000) });
    } catch {
      throw new OAuthFailure("Could not reach the sign-in provider. Please try again.");
    }
    if (!res.ok) throw new OAuthFailure("The sign-in provider refused the request. Please try again.");
    return res.json();
  };

  const lookup = (req, res) => {
    const provider = providers[req.params.provider];
    if (!provider) { res.status(404).json({ error: { code: "not_found", message: "Unknown sign-in provider." } }); return null; }
    const creds = provider.credentials(config);
    if (!creds.id || !creds.secret) { fail(res, `${provider.name} sign-in isn't set up on this server yet.`); return null; }
    return { provider, ...creds };
  };

  router.get("/:provider", (req, res) => {
    const found = lookup(req, res);
    if (!found) return;
    const nonce = crypto.randomBytes(24).toString("base64url");
    const verifier = crypto.randomBytes(32).toString("base64url");
    const cookie = jwt.sign({ p: req.params.provider, n: nonce, v: verifier }, config.jwtSecret, { algorithm: "HS256", expiresIn: STATE_TTL_SECONDS });
    const params = new URLSearchParams({
      client_id: found.id,
      redirect_uri: callbackUrl(req.params.provider),
      state: nonce,
      ...found.provider.extraAuthorizeParams,
      ...(found.provider.pkce ? { code_challenge: sha256Base64Url(verifier), code_challenge_method: "S256" } : {}),
    });
    res.cookie(STATE_COOKIE, cookie, { ...cookieOptions, maxAge: STATE_TTL_SECONDS * 1000 });
    res.set("Cache-Control", "no-store");
    res.redirect(`${found.provider.authorizeUrl}?${params}`);
  });

  router.get("/:provider/callback", async (req, res) => {
    const found = lookup(req, res);
    if (!found) return;
    res.set("Cache-Control", "no-store");
    try {
      if (req.query.error) {
        throw new OAuthFailure(req.query.error === "access_denied" ? "Sign-in was cancelled." : `${found.provider.name} could not sign you in.`);
      }
      let saved;
      try {
        saved = jwt.verify(readCookie(req, STATE_COOKIE) ?? "", config.jwtSecret, { algorithms: ["HS256"] });
      } catch {
        throw new OAuthFailure("The sign-in took too long or was started in another browser. Please try again.");
      }
      res.clearCookie(STATE_COOKIE, cookieOptions);
      if (saved.p !== req.params.provider || !same(saved.n, String(req.query.state ?? ""))) {
        throw new OAuthFailure("The sign-in could not be verified. Please try again.");
      }
      const code = String(req.query.code ?? "");
      if (!code) throw new OAuthFailure("The sign-in was incomplete. Please try again.");

      const who = await found.provider.identity(fetchJson, {
        clientId: found.id, clientSecret: found.secret, redirectUri: callbackUrl(req.params.provider), code, verifier: saved.v,
      });
      const email = String(who.email ?? "").trim().toLowerCase();
      if (!who.providerUserId || !email || !who.emailVerified) {
        throw new OAuthFailure(`Your ${found.provider.name} account needs a verified email address to sign in here.`);
      }
      const providerUserId = String(who.providerUserId);

      let user = await users.findByOAuth(req.params.provider, providerUserId);
      if (!user) {
        const existing = await users.findByEmail(email);
        if (existing) {
          // The provider has verified this email, so it is the same person. We never verified the email on
          // password sign-ups, so the old password is removed: nobody who pre-registered someone else's
          // email can keep a way into the account.
          await users.linkOAuth({ userId: existing.id, provider: req.params.provider, providerUserId, email, clearPassword: Boolean(existing.password_hash) });
          user = existing;
        } else {
          const name = String(who.name ?? "").trim().slice(0, 100) || email.split("@")[0];
          try {
            user = await users.createOAuthUser({ name, email, provider: req.params.provider, providerUserId });
          } catch (err) {
            if (!(err instanceof EmailTakenError)) throw err;
            throw new OAuthFailure("That email was just registered. Please try signing in again.");
          }
        }
      }
      res.redirect(`${publicUrl}/auth/callback#token=${signToken(user, config)}`);
    } catch (err) {
      if (!(err instanceof OAuthFailure)) console.error("OAuth sign-in failed:", err);
      fail(res, err instanceof OAuthFailure ? err.message : "Sign-in failed. Please try again.");
    }
  });

  return router;
}
