export async function checkMl(baseUrl, timeoutMs) {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/health`, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`ML service responded with ${res.status}`);
  return res.json();
}

export async function mlChip(baseUrl, body, timeoutMs = 120000) {
  let res;
  try {
    res = await fetch(`${baseUrl.replace(/\/$/, "")}/raster/chip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch {
    const err = new Error("The ML service is unreachable. Is it running on port 8000?");
    err.code = "ml_service_unavailable";
    err.retryable = true;
    throw err;
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error?.message ?? `ML service responded with ${res.status}`);
    err.code = data?.error?.code ?? "ml_service_error";
    err.retryable = res.status >= 500;
    throw err;
  }
  return data;
}
