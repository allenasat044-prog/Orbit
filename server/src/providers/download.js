import crypto from "node:crypto";
import fs from "node:fs";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { ProviderAuthError } from "./copernicusAuth.js";

export class DownloadError extends Error {
  constructor(code, message, retryable = false) {
    super(message);
    this.name = "DownloadError";
    this.code = code;
    this.retryable = retryable;
  }
}

const hostAllowed = (host, suffixes) => suffixes.some((s) => host === s || host.endsWith(`.${s}`));
const isLocal = (host) => host === "localhost" || host === "127.0.0.1";

export async function downloadToFile({ url, destPath, token, fetchImpl = fetch, maxBytes, allowedHosts, timeoutMs = 300000, maxRedirects = 5 }) {
  let current = url;
  let res;
  for (let hop = 0; ; hop++) {
    let u;
    try {
      u = new URL(current);
    } catch {
      throw new DownloadError("invalid_url", "Asset URL is not valid.");
    }
    if (!hostAllowed(u.hostname, allowedHosts)) throw new DownloadError("host_not_allowed", `Downloads from ${u.hostname} are not allowed.`);
    if (u.protocol !== "https:" && !isLocal(u.hostname)) throw new DownloadError("insecure_url", "Asset URL must use https.");
    try {
      res = await fetchImpl(current, { headers: { Authorization: `Bearer ${token}` }, redirect: "manual", signal: AbortSignal.timeout(timeoutMs) });
    } catch (err) {
      const timedOut = err?.name === "TimeoutError" || err?.name === "AbortError";
      throw new DownloadError(timedOut ? "provider_timeout" : "provider_unavailable", timedOut ? "Download timed out." : "Download server unreachable.", true);
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      if (hop >= maxRedirects) throw new DownloadError("too_many_redirects", "Too many redirects while downloading.");
      current = new URL(res.headers.get("location"), current).href;
      continue;
    }
    break;
  }

  if (res.status === 401 || res.status === 403) throw new ProviderAuthError("provider_auth_failed", "Copernicus refused the download. Check your account and credentials.");
  if (res.status === 404) throw new DownloadError("asset_not_found", "The asset no longer exists at the provider.");
  if (res.status === 429 || res.status >= 500) throw new DownloadError("provider_unavailable", `Download server responded with ${res.status}.`, true);
  if (!res.ok || !res.body) throw new DownloadError("provider_error", `Download failed with status ${res.status}.`);

  const declared = Number(res.headers.get("content-length"));
  if (maxBytes && Number.isFinite(declared) && declared > maxBytes) throw new DownloadError("too_large", `Asset is larger than the ${maxBytes}-byte limit.`);

  const hash = crypto.createHash("sha256");
  let size = 0;
  const part = `${destPath}.part`;
  const meter = new Transform({
    transform(chunk, _enc, cb) {
      size += chunk.length;
      if (maxBytes && size > maxBytes) return cb(new DownloadError("too_large", `Asset is larger than the ${maxBytes}-byte limit.`));
      hash.update(chunk);
      cb(null, chunk);
    },
  });
  try {
    await pipeline(Readable.fromWeb(res.body), meter, fs.createWriteStream(part));
    await fs.promises.rename(part, destPath);
  } catch (err) {
    await fs.promises.rm(part, { force: true });
    if (err instanceof DownloadError) throw err;
    throw new DownloadError("provider_unavailable", "Download was interrupted.", true);
  }
  return { sha256: hash.digest("hex"), size, contentType: res.headers.get("content-type") };
}
