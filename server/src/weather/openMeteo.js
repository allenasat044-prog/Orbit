import { fetchJson, ProviderError } from "../providers/http.js";
import { wmoText } from "./wmo.js";

const HOURLY = ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "weather_code", "cloud_cover", "wind_speed_10m", "wind_gusts_10m"];
const DAILY = ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_sum", "sunrise", "sunset"];

export const SOURCE = {
  name: "Open-Meteo",
  url: "https://open-meteo.com/",
  licence: "CC BY 4.0",
  attribution: "Weather data by Open-Meteo.com",
  non_commercial_only: true,
};

export const roundCoord = (v) => Math.round(v * 100) / 100;

export function buildForecastUrl(base, { lat, lon, days }) {
  const q = new URLSearchParams({
    latitude: String(roundCoord(lat)),
    longitude: String(roundCoord(lon)),
    hourly: HOURLY.join(","),
    daily: DAILY.join(","),
    timezone: "auto",
    forecast_days: String(days),
  });
  return `${base}?${q.toString()}`;
}

const arr = (obj, key, n) => (Array.isArray(obj?.[key]) ? obj[key] : new Array(n).fill(null));

export function nowIndex(times, utcOffsetSeconds, nowMs) {
  if (!times.length) return null;
  const local = new Date(nowMs + (utcOffsetSeconds ?? 0) * 1000).toISOString().slice(0, 13) + ":00";
  const i = times.findIndex((t) => t.slice(0, 13) === local.slice(0, 13));
  return i >= 0 ? i : null;
}

export function normalizeForecast(raw, { nowMs = Date.now() } = {}) {
  const h = raw?.hourly;
  if (!h || !Array.isArray(h.time) || !h.time.length) throw new ProviderError("The weather service returned no hourly data.", { code: "provider_error" });
  const n = h.time.length;
  const codes = arr(h, "weather_code", n);
  const d = raw.daily ?? {};
  const dn = Array.isArray(d.time) ? d.time.length : 0;
  const dcodes = arr(d, "weather_code", dn);
  return {
    location: { lat: raw.latitude, lon: raw.longitude, elevation_m: raw.elevation ?? null, timezone: raw.timezone ?? null, utc_offset_seconds: raw.utc_offset_seconds ?? 0 },
    now_index: nowIndex(h.time, raw.utc_offset_seconds, nowMs),
    hourly: {
      time: h.time,
      temperature_c: arr(h, "temperature_2m", n),
      humidity_pct: arr(h, "relative_humidity_2m", n),
      precipitation_probability_pct: arr(h, "precipitation_probability", n),
      precipitation_mm: arr(h, "precipitation", n),
      cloud_cover_pct: arr(h, "cloud_cover", n),
      wind_speed_kmh: arr(h, "wind_speed_10m", n),
      wind_gust_kmh: arr(h, "wind_gusts_10m", n),
      weather_code: codes,
      summary: codes.map(wmoText),
    },
    daily: {
      date: d.time ?? [],
      tmax_c: arr(d, "temperature_2m_max", dn),
      tmin_c: arr(d, "temperature_2m_min", dn),
      precipitation_mm: arr(d, "precipitation_sum", dn),
      sunrise: arr(d, "sunrise", dn),
      sunset: arr(d, "sunset", dn),
      weather_code: dcodes,
      summary: dcodes.map(wmoText),
    },
    source: SOURCE,
  };
}

export function createWeatherProvider({ baseUrl, timeoutMs = 10000, retries = 2, ttlMs = 600_000, maxEntries = 500, fetchImpl, sleep, now = Date.now }) {
  const cache = new Map();
  return {
    async forecast({ lat, lon, days }) {
      const key = `${roundCoord(lat)},${roundCoord(lon)},${days}`;
      const hit = cache.get(key);
      if (hit && hit.expires > now()) return { ...hit.value, cached: true };
      const raw = await fetchJson(buildForecastUrl(baseUrl, { lat, lon, days }), { timeoutMs, retries, fetchImpl, sleep });
      const value = { ...normalizeForecast(raw, { nowMs: now() }), fetched_at: new Date(now()).toISOString() };
      if (cache.size >= maxEntries) cache.delete(cache.keys().next().value);
      cache.set(key, { value, expires: now() + ttlMs });
      return { ...value, cached: false };
    },
  };
}
