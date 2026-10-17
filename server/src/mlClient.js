export async function checkMl(baseUrl, timeoutMs) {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/health`, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) throw new Error(`ML service responded with ${res.status}`);
  return res.json();
}
