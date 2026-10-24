export async function checkMl(baseUrl, timeoutMs) {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/health`, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`ML service responded with ${res.status}`);
  return res.json();
}

export async function mlRequest(baseUrl, path, { method = "GET", body, timeoutMs = 120000 } = {}) {
  let res;
  try {
    res = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (cause) {
    const timedOut = cause?.name === "TimeoutError" || cause?.name === "AbortError";
    const err = new Error(timedOut ? "The ML service took too long to respond." : "The ML service is unreachable. Is it running on port 8000?");
    err.code = timedOut ? "ml_service_timeout" : "ml_service_unavailable";
    err.retryable = true;
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error?.message ?? `ML service responded with ${res.status}`);
    err.code = data?.error?.code ?? "ml_service_error";
    err.status = res.status;
    err.retryable = res.status >= 500 && err.code !== "model_unavailable" && err.code !== "model_error";
    throw err;
  }
  return data;
}

export const mlChip = (baseUrl, body, timeoutMs = 120000) => mlRequest(baseUrl, "/raster/chip", { method: "POST", body, timeoutMs });
export const mlCaption = (baseUrl, body, timeoutMs = 300000) => mlRequest(baseUrl, "/caption", { method: "POST", body, timeoutMs });
export const mlModels = (baseUrl, timeoutMs = 10000) => mlRequest(baseUrl, "/models", { timeoutMs });
export const mlModel = (baseUrl, id, timeoutMs = 10000) => mlRequest(baseUrl, `/models/${encodeURIComponent(id)}`, { timeoutMs });
export const mlClassify = (baseUrl, body, timeoutMs = 120000) => mlRequest(baseUrl, "/classify", { method: "POST", body, timeoutMs });
export const mlScore = (baseUrl, body, timeoutMs = 120000) => mlRequest(baseUrl, "/score", { method: "POST", body, timeoutMs });
export const mlLabelChip = (baseUrl, body, timeoutMs = 120000) => mlRequest(baseUrl, "/raster/label-chip", { method: "POST", body, timeoutMs });
export const mlChange = (baseUrl, body, timeoutMs = 180000) => mlRequest(baseUrl, "/change/analyze", { method: "POST", body, timeoutMs });
