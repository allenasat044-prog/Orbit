export async function runCheck(fn) {
  const started = Date.now();
  try {
    const detail = await fn();
    return { status: "ok", latency_ms: Date.now() - started, ...detail };
  } catch (err) {
    return { status: "down", latency_ms: Date.now() - started, error: err?.message ?? String(err) };
  }
}
