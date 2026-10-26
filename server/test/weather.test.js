import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import { wmoText } from "../src/weather/wmo.js";
import { buildForecastUrl, normalizeForecast, nowIndex, createWeatherProvider, roundCoord, SOURCE } from "../src/weather/openMeteo.js";
import { createWeatherRouter } from "../src/weather/routes.js";
import { ProviderError } from "../src/providers/http.js";

const BASE = "https://api.open-meteo.com/v1/forecast";
const NOW = Date.parse("2026-10-25T10:30:00Z");

function sampleRaw(hours = 72, over = {}) {
  const time = Array.from({ length: hours }, (_, i) => {
    const d = new Date(Date.UTC(2026, 9, 25, 0, 0) + i * 3_600_000);
    return d.toISOString().slice(0, 13) + ":00";
  });
  const days = Math.ceil(hours / 24);
  return {
    latitude: 28.6, longitude: 77.2, elevation: 216, timezone: "Asia/Kolkata", utc_offset_seconds: 19800,
    hourly: {
      time,
      temperature_2m: time.map((_, i) => 20 + (i % 12)),
      relative_humidity_2m: time.map(() => 55),
      precipitation_probability: time.map((_, i) => (i === 20 ? 70 : 0)),
      precipitation: time.map((_, i) => (i === 20 ? 2.4 : 0)),
      weather_code: time.map((_, i) => (i === 20 ? 63 : 1)),
      cloud_cover: time.map((_, i) => (i * 3) % 100),
      wind_speed_10m: time.map(() => 11),
      wind_gusts_10m: time.map(() => 24),
    },
    daily: {
      time: Array.from({ length: days }, (_, i) => `2026-10-${25 + i}`),
      weather_code: Array.from({ length: days }, () => 3),
      temperature_2m_max: Array.from({ length: days }, () => 31),
      temperature_2m_min: Array.from({ length: days }, () => 19),
      precipitation_sum: Array.from({ length: days }, () => 0.4),
      sunrise: Array.from({ length: days }, (_, i) => `2026-10-${25 + i}T06:20`),
      sunset: Array.from({ length: days }, (_, i) => `2026-10-${25 + i}T17:41`),
    },
    ...over,
  };
}

const res = (status, body) => ({ ok: status >= 200 && status < 300, status, headers: { get: () => null }, json: async () => body, text: async () => JSON.stringify(body) });

test("weather codes are described in plain words, with a safe fallback", () => {
  assert.equal(wmoText(0), "Clear sky");
  assert.equal(wmoText(63), "Rain");
  assert.equal(wmoText(95), "Thunderstorm");
  assert.equal(wmoText(999), "Conditions unknown");
  assert.equal(wmoText(null), "Conditions unknown");
});

test("the request asks for the documented hourly and daily variables, rounds the pin and uses local time", () => {
  const u = new URL(buildForecastUrl(BASE, { lat: 28.61294, lon: 77.22951, days: 5 }));
  assert.equal(u.origin + u.pathname, BASE);
  assert.equal(u.searchParams.get("latitude"), "28.61");
  assert.equal(u.searchParams.get("longitude"), "77.23");
  assert.equal(u.searchParams.get("forecast_days"), "5");
  assert.equal(u.searchParams.get("timezone"), "auto");
  assert.deepEqual(u.searchParams.get("hourly").split(","), ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "precipitation", "weather_code", "cloud_cover", "wind_speed_10m", "wind_gusts_10m"]);
  assert.ok(u.searchParams.get("daily").split(",").includes("sunrise"));
  assert.equal(roundCoord(28.614), 28.61);
  assert.equal(roundCoord(77.2251), 77.23);
});

test("'now' is found in the location's own time zone and is null when outside the forecast window", () => {
  const raw = sampleRaw();
  assert.equal(raw.hourly.time[nowIndex(raw.hourly.time, 19800, NOW)], "2026-10-25T16:00");
  assert.equal(raw.hourly.time[nowIndex(raw.hourly.time, 0, NOW)], "2026-10-25T10:00");
  assert.equal(nowIndex(raw.hourly.time, 0, Date.parse("2027-01-01T00:00:00Z")), null);
  assert.equal(nowIndex([], 0, NOW), null);
});

test("the forecast is reshaped into plain arrays with summaries, units in the names and attribution", () => {
  const f = normalizeForecast(sampleRaw(), { nowMs: NOW });
  assert.equal(f.hourly.time.length, 72);
  for (const k of ["temperature_c", "humidity_pct", "precipitation_probability_pct", "precipitation_mm", "cloud_cover_pct", "wind_speed_kmh", "wind_gust_kmh", "weather_code", "summary"]) assert.equal(f.hourly[k].length, 72, k);
  assert.equal(f.hourly.summary[20], "Rain");
  assert.equal(f.hourly.summary[0], "Mainly clear");
  assert.equal(f.hourly.precipitation_mm[20], 2.4);
  assert.equal(f.now_index, 16);
  assert.deepEqual(f.location, { lat: 28.6, lon: 77.2, elevation_m: 216, timezone: "Asia/Kolkata", utc_offset_seconds: 19800 });
  assert.equal(f.daily.date.length, 3);
  assert.equal(f.daily.summary[0], "Overcast");
  assert.deepEqual([f.daily.tmax_c[0], f.daily.tmin_c[0]], [31, 19]);
  assert.deepEqual(f.source, SOURCE);
  assert.equal(f.source.attribution, "Weather data by Open-Meteo.com");
  assert.equal(f.source.non_commercial_only, true);
});

test("missing variables become nulls instead of crashing, and an empty answer is an error", () => {
  const raw = sampleRaw(24);
  delete raw.hourly.cloud_cover;
  raw.hourly.temperature_2m[3] = null;
  delete raw.daily;
  const f = normalizeForecast(raw, { nowMs: NOW });
  assert.deepEqual(f.hourly.cloud_cover_pct, new Array(24).fill(null));
  assert.equal(f.hourly.temperature_c[3], null);
  assert.deepEqual(f.daily.date, []);
  assert.throws(() => normalizeForecast({}), (e) => e instanceof ProviderError);
  assert.throws(() => normalizeForecast({ hourly: { time: [] } }), (e) => e instanceof ProviderError);
});

test("the provider caches by rounded location and length, expires entries, and retries temporary failures", async () => {
  let t = NOW;
  let calls = 0;
  const urls = [];
  const fetchImpl = async (url) => { calls++; urls.push(url); return calls === 1 ? res(503, {}) : res(200, sampleRaw(48)); };
  const w = createWeatherProvider({ baseUrl: BASE, ttlMs: 600_000, fetchImpl, sleep: async () => {}, now: () => t });
  const a = await w.forecast({ lat: 28.6101, lon: 77.2301, days: 2 });
  assert.equal(calls, 2);
  assert.equal(a.cached, false);
  const b = await w.forecast({ lat: 28.6149, lon: 77.2251, days: 2 });
  assert.equal(calls, 2);
  assert.equal(b.cached, true);
  assert.equal(b.fetched_at, a.fetched_at);
  await w.forecast({ lat: 28.61, lon: 77.23, days: 3 });
  assert.equal(calls, 3);
  t += 601_000;
  const c = await w.forecast({ lat: 28.61, lon: 77.23, days: 2 });
  assert.equal(c.cached, false);
  assert.equal(calls, 4);
});

test("the provider cache stays within its size limit and outages surface as provider errors", async () => {
  let calls = 0;
  const w = createWeatherProvider({ baseUrl: BASE, maxEntries: 2, fetchImpl: async () => { calls++; return res(200, sampleRaw(24)); }, sleep: async () => {} });
  for (const lat of [10, 20, 30]) await w.forecast({ lat, lon: 0, days: 1 });
  await w.forecast({ lat: 30, lon: 0, days: 1 });
  await w.forecast({ lat: 10, lon: 0, days: 1 });
  assert.equal(calls, 4);
  const down = createWeatherProvider({ baseUrl: BASE, retries: 0, fetchImpl: async () => { throw new Error("net"); } });
  await assert.rejects(() => down.forecast({ lat: 1, lon: 1, days: 1 }), (e) => e instanceof ProviderError && e.code === "provider_unavailable");
});

function routes(forecast) {
  const calls = [];
  const server = createApp({
    config: { corsOrigin: "x", rateLimitPerMin: 1000, weatherRateLimit: 1000 }, checks: {}, providers: new Map(),
    routers: [{ path: "/api", router: createWeatherRouter({ config: { weatherRateLimit: 1000 }, weather: { forecast: async (p) => { calls.push(p); return forecast(p); } } }) }],
  }).listen(0);
  return { base: `http://localhost:${server.address().port}`, calls, close: () => server.close() };
}

test("GET /weather/forecast validates the pin and length, uses 3 days by default and returns attribution", async () => {
  const s = routes(async () => ({ ...normalizeForecast(sampleRaw(), { nowMs: NOW }), fetched_at: "t", cached: false }));
  const ok = await fetch(`${s.base}/api/weather/forecast?lat=28.6129&lon=77.2295`);
  const body = await ok.json();
  const bad = await Promise.all(["", "lat=28.6", "lat=abc&lon=1", "lat=100&lon=1", "lat=1&lon=181", "lat=1&lon=1&days=0", "lat=1&lon=1&days=11", "lat=1&lon=1&days=1.5"].map((q) => fetch(`${s.base}/api/weather/forecast?${q}`)));
  s.close();
  assert.equal(ok.status, 200);
  assert.deepEqual(s.calls[0], { lat: 28.6129, lon: 77.2295, days: 3 });
  assert.equal(body.source.attribution, "Weather data by Open-Meteo.com");
  assert.equal(body.hourly.summary[20], "Rain");
  assert.deepEqual(bad.map((r) => r.status), [400, 400, 400, 400, 400, 400, 400, 400]);
  assert.equal((await bad[0].json()).error.code, "validation_error");
});

test("provider failures become 502 and 504 with readable messages, not crashes", async () => {
  const down = routes(async () => { throw new ProviderError("x", { code: "provider_unavailable" }); });
  const slow = routes(async () => { throw new ProviderError("x", { code: "provider_timeout" }); });
  const rejected = routes(async () => { throw new ProviderError("x", { code: "provider_error", status: 400, body: "bad variable" }); });
  const r1 = await fetch(`${down.base}/api/weather/forecast?lat=1&lon=1`);
  const r2 = await fetch(`${slow.base}/api/weather/forecast?lat=1&lon=1`);
  const r3 = await fetch(`${rejected.base}/api/weather/forecast?lat=1&lon=1`);
  const b3 = await r3.json();
  [down, slow, rejected].forEach((s) => s.close());
  assert.deepEqual([r1.status, r2.status, r3.status], [502, 504, 502]);
  assert.equal(b3.error.code, "weather_unavailable");
  assert.deepEqual(b3.error.details, { upstream_status: 400, upstream_body: "bad variable" });
});
