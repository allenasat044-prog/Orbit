export class ProviderAuthError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "ProviderAuthError";
    this.code = code;
    this.retryable = code === "provider_unavailable";
  }
}

export function createTokenManager({ username, password, tokenUrl, fetchImpl = fetch, now = Date.now, timeoutMs = 15000 }) {
  let cached = null;
  let inflight = null;

  async function request() {
    if (!username || !password) {
      throw new ProviderAuthError("provider_not_configured", "Copernicus credentials are not configured. Set COPERNICUS_USERNAME and COPERNICUS_PASSWORD in server/.env.");
    }
    let res;
    try {
      res = await fetchImpl(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ client_id: "cdse-public", username, password, grant_type: "password" }),
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      throw new ProviderAuthError("provider_unavailable", "The Copernicus login service is unreachable.");
    }
    if (res.status === 400 || res.status === 401) throw new ProviderAuthError("provider_auth_failed", "Copernicus rejected the username or password.");
    if (!res.ok) throw new ProviderAuthError("provider_unavailable", `The Copernicus login service responded with ${res.status}.`);
    const body = await res.json().catch(() => ({}));
    if (!body.access_token) throw new ProviderAuthError("provider_unavailable", "The Copernicus login service returned no token.");
    cached = { token: body.access_token, expiresAt: now() + (Number(body.expires_in) || 300) * 1000 };
    return cached.token;
  }

  return {
    async getToken() {
      if (cached && cached.expiresAt - now() > 60_000) return cached.token;
      inflight ??= request().finally(() => {
        inflight = null;
      });
      return inflight;
    },
    invalidate() {
      cached = null;
    },
  };
}
