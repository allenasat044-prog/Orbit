export class ProviderError extends Error {
  constructor(message, { code, status, body } = {}) {
    super(message);
    this.name = "ProviderError";
    this.code = code ?? "provider_error";
    this.status = status;
    this.body = body;
  }
}

const defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchJson(url, opts = {}) {
  const { fetchImpl = fetch, timeoutMs = 20000, retries = 2, backoffMs = 500, headers = {}, sleep = defaultSleep } = opts;
  let attempt = 0;
  for (;;) {
    let res;
    try {
      res = await fetchImpl(url, {
        headers: { Accept: "application/json", ...headers },
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (err) {
      const timedOut = err?.name === "TimeoutError" || err?.name === "AbortError";
      if (attempt < retries) {
        await sleep(backoffMs * 2 ** attempt);
        attempt++;
        continue;
      }
      throw new ProviderError(timedOut ? "Provider request timed out" : "Provider unreachable", {
        code: timedOut ? "provider_timeout" : "provider_unavailable",
      });
    }

    if (res.ok) {
      try {
        return await res.json();
      } catch {
        throw new ProviderError("Provider returned invalid JSON", { code: "provider_error", status: res.status });
      }
    }
    if (res.status === 404) throw new ProviderError("Not found at provider", { code: "not_found", status: 404 });
    if ((res.status === 429 || res.status >= 500) && attempt < retries) {
      const retryAfter = Number(res.headers?.get?.("retry-after"));
      const wait = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter * 1000, 5000) : backoffMs * 2 ** attempt;
      await sleep(wait);
      attempt++;
      continue;
    }
    const body = (await res.text().catch(() => "")).slice(0, 300);
    throw new ProviderError(`Provider responded with ${res.status}`, { code: "provider_error", status: res.status, body });
  }
}
