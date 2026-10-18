import { HttpError } from "./errors.js";
import { fetchJson, ProviderError } from "./providers/http.js";

const COORD = /^\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)\s*$/;
const POINT_RADIUS_DEG = 0.01;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export function parseCoordinates(q) {
  const m = COORD.exec(q);
  if (!m) return null;
  const lat = Number(m[1]);
  const lon = Number(m[2]);
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    throw new HttpError(422, "invalid_coordinates", "Coordinates must be written as 'latitude,longitude'.");
  }
  return {
    lat,
    lon,
    bbox: [clamp(lon - POINT_RADIUS_DEG, -180, 180), clamp(lat - POINT_RADIUS_DEG, -90, 90), clamp(lon + POINT_RADIUS_DEG, -180, 180), clamp(lat + POINT_RADIUS_DEG, -90, 90)],
    display_name: `${lat}, ${lon}`,
    source: "coordinates",
  };
}

export function createGeocoder({ baseUrl, userAgent, timeoutMs = 8000, ttlMs = 86_400_000, minIntervalMs = 1100, fetchImpl, now = Date.now, sleep = (ms) => new Promise((r) => setTimeout(r, ms)) }) {
  const cache = new Map();
  let last = 0;
  let chain = Promise.resolve();

  const throttled = (fn) => {
    const run = chain.then(async () => {
      const wait = Math.max(0, last + minIntervalMs - now());
      if (wait) await sleep(wait);
      last = now();
      return fn();
    });
    chain = run.catch(() => {});
    return run;
  };

  async function resolve(q) {
    const point = parseCoordinates(q);
    if (point) return point;

    const key = q.trim().toLowerCase();
    const hit = cache.get(key);
    if (hit && hit.expires > now()) return hit.value;

    const url = `${baseUrl.replace(/\/$/, "")}/search?${new URLSearchParams({ q, format: "jsonv2", limit: "1" })}`;
    let results;
    try {
      results = await throttled(() => fetchJson(url, { fetchImpl, timeoutMs, retries: 1, headers: { "User-Agent": userAgent, "Accept-Language": "en" } }));
    } catch (err) {
      if (err instanceof ProviderError) throw new HttpError(502, "geocoder_unavailable", "Place search is unavailable right now. Try coordinates like '12.97,77.59'.");
      throw err;
    }
    const top = Array.isArray(results) ? results[0] : null;
    if (!top?.boundingbox) throw new HttpError(404, "place_not_found", `No place found for "${q}".`);

    const [south, north, west, east] = top.boundingbox.map(Number);
    const value = {
      lat: Number(top.lat),
      lon: Number(top.lon),
      bbox: [clamp(west, -180, 180), clamp(south, -90, 90), clamp(east, -180, 180), clamp(north, -90, 90)],
      display_name: top.display_name ?? q,
      source: "nominatim",
    };
    if (cache.size >= 500) cache.delete(cache.keys().next().value);
    cache.set(key, { value, expires: now() + ttlMs });
    return value;
  }

  return { resolve };
}
