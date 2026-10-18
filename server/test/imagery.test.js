import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { createApp } from "../src/app.js";
import { CopernicusProvider, normalizeItem, InvalidItemError } from "../src/providers/copernicus.js";
import { createGeocoder, parseCoordinates } from "../src/geocode.js";
import { fetchJson, ProviderError } from "../src/providers/http.js";
import { parseBbox, parseDateRange } from "../src/imagery/routes.js";
import { pointBbox, pointInGeometry } from "../src/imagery/geo.js";

const STAC = "https://stac.dataspace.copernicus.eu/v1/";
const ID = "S2B_MSIL2A_20261017T042749_N0513_R133_T50WMV_20261017T062857";

const feature = (id = ID, over = {}) => ({
  id,
  type: "Feature",
  collection: "sentinel-2-l2a",
  bbox: [114.647, 67.093, 115.386, 67.603],
  geometry: { type: "Polygon", coordinates: [[[115.386, 67.603], [114.647, 67.598], [114.695, 67.093], [115.386, 67.603]]] },
  links: [{ rel: "self", href: `${STAC}collections/sentinel-2-l2a/items/${id}` }],
  assets: {
    TCI_10m: { href: "s3://eodata/x/TCI_10m.jp2", roles: ["visual", "gsd:10m"], gsd: 10, type: "image/jp2", title: "True color image", "file:size": 17837982, alternate: { https: { href: "https://download.dataspace.copernicus.eu/odata/v1/x/$value" } }, bands: [{ name: "B04", "eo:common_name": "red", "eo:center_wavelength": 0.665 }] },
    TCI_60m: { href: "s3://eodata/x/TCI_60m.jp2", roles: ["visual", "gsd:60m"], gsd: 60 },
    B02_10m: { href: "s3://eodata/x/B02_10m.jp2", roles: ["data", "reflectance"], gsd: 10, bands: [{ name: "B02", "eo:common_name": "blue", "eo:center_wavelength": 0.493 }] },
    thumbnail: { href: "https://datahub.creodias.eu/odata/v1/Assets(1)/$value", roles: ["thumbnail"], type: "image/jpeg" },
  },
  properties: {
    datetime: "2026-10-17T04:27:49.024000Z", platform: "sentinel-2b", constellation: "sentinel-2", instruments: ["msi"], gsd: 10,
    "eo:cloud_cover": 0.05, "processing:level": "L2", "product:type": "S2MSI2A", "grid:code": "MGRS-50WMV",
    _private: { product_uuid: "secret-ish" }, "auth:schemes": { s3: { type: "s3" } }, "storage:schemes": { x: {} },
  },
  ...over,
});

const fakeResponse = (status, body, headers = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (k) => headers[k.toLowerCase()] ?? null },
  json: async () => body,
  text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
});
const noSleep = async () => {};

test("normalizeItem maps real STAC fields, strips private data, picks the highest-res visual asset", () => {
  const r = normalizeItem(feature());
  assert.equal(r.external_id, ID);
  assert.equal(r.platform, "sentinel-2b");
  assert.equal(r.cloud_cover, 0.05);
  assert.equal(r.grid_code, "MGRS-50WMV");
  assert.equal(r.visual_asset_key, "TCI_10m");
  assert.equal(r.assets.TCI_10m.https_href, "https://download.dataspace.copernicus.eu/odata/v1/x/$value");
  assert.equal(r.assets.TCI_10m.s3_href, "s3://eodata/x/TCI_10m.jp2");
  assert.equal(r.assets.B02_10m.bands[0].common_name, "blue");
  assert.equal("_private" in r.properties, false);
  assert.equal("auth:schemes" in r.properties, false);
  assert.match(r.attribution, /Copernicus Sentinel data 2026/);
});

test("normalizeItem rejects items without time or polygon, and tolerates missing assets", () => {
  assert.throws(() => normalizeItem(feature(ID, { properties: {} })), InvalidItemError);
  assert.throws(() => normalizeItem(feature(ID, { geometry: { type: "Point", coordinates: [0, 0] } })), InvalidItemError);
  const r = normalizeItem(feature(ID, { assets: undefined }));
  assert.equal(r.visual_asset_key, null);
  assert.deepEqual(r.assets, {});
});

test("provider builds the documented search request and reads the next link", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    return fakeResponse(200, {
      features: [feature(), feature("bad", { properties: {} })],
      links: [{ rel: "next", method: "GET", href: `${STAC}search?collections=sentinel-2-l2a&token=next:abc` }],
    });
  };
  const p = new CopernicusProvider({ stacUrl: STAC, fetchImpl, sleep: noSleep });
  const r = await p.search({ collection: "sentinel-2-l2a", bbox: [1, 2, 3, 4], start: "2026-10-01T00:00:00Z", end: "2026-10-17T23:59:59Z", cloudMax: 20, limit: 5 });
  const u = new URL(calls[0]);
  assert.equal(u.pathname, "/v1/search");
  assert.equal(u.searchParams.get("collections"), "sentinel-2-l2a");
  assert.equal(u.searchParams.get("bbox"), "1,2,3,4");
  assert.equal(u.searchParams.get("datetime"), "2026-10-01T00:00:00Z/2026-10-17T23:59:59Z");
  assert.equal(u.searchParams.get("filter"), "eo:cloud_cover<=20");
  assert.equal(u.searchParams.get("fields"), "-assets");
  assert.equal(r.items.length, 1);
  assert.equal(r.skipped, 1);
  assert.match(r.nextUrl, /token=next:abc/);
});

test("provider omits cloud filter for Sentinel-1 and retries without sortby on a 400", async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(new URL(url));
    return calls.length === 1 ? fakeResponse(400, "bad sortby") : fakeResponse(200, { features: [], links: [] });
  };
  const p = new CopernicusProvider({ stacUrl: STAC, fetchImpl, sleep: noSleep });
  await p.search({ collection: "sentinel-1-grd", bbox: [1, 2, 3, 4], start: "a", end: "b", cloudMax: 10, limit: 5 });
  assert.equal(calls.length, 2);
  assert.equal(calls[0].searchParams.has("filter"), false);
  assert.equal(calls[0].searchParams.has("sortby"), true);
  assert.equal(calls[1].searchParams.has("sortby"), false);
});

test("cursor allow-list rejects foreign hosts and non-search paths", () => {
  const p = new CopernicusProvider({ stacUrl: STAC });
  assert.equal(p.isAllowedCursor(`${STAC}search?token=x`), true);
  assert.equal(p.isAllowedCursor("https://evil.example.com/v1/search?token=x"), false);
  assert.equal(p.isAllowedCursor(`${STAC}collections`), false);
  assert.equal(p.isAllowedCursor("not a url"), false);
});

test("fetchJson retries 5xx with backoff, then succeeds; maps timeouts and 404", async () => {
  let n = 0;
  const ok = await fetchJson("x", { fetchImpl: async () => (++n < 3 ? fakeResponse(503, "") : fakeResponse(200, { a: 1 })), sleep: noSleep });
  assert.deepEqual(ok, { a: 1 });
  assert.equal(n, 3);

  const timeout = Object.assign(new Error("t"), { name: "TimeoutError" });
  await assert.rejects(() => fetchJson("x", { fetchImpl: async () => { throw timeout; }, retries: 1, sleep: noSleep }), (e) => e instanceof ProviderError && e.code === "provider_timeout");
  await assert.rejects(() => fetchJson("x", { fetchImpl: async () => fakeResponse(404, ""), sleep: noSleep }), (e) => e.code === "not_found");
  await assert.rejects(() => fetchJson("x", { fetchImpl: async () => { throw new Error("down"); }, retries: 0 }), (e) => e.code === "provider_unavailable");
});

test("coordinates parse as lat,lon and bad ranges are rejected", () => {
  const p = parseCoordinates("12.97, 77.59");
  assert.equal(p.lat, 12.97);
  assert.equal(p.lon, 77.59);
  assert.ok(p.bbox[0] < 77.59 && p.bbox[2] > 77.59);
  assert.equal(parseCoordinates("Bengaluru"), null);
  assert.throws(() => parseCoordinates("120, 77.59"), /latitude,longitude/);
});

test("geocoder uses Nominatim format, sends a User-Agent, caches, and throttles", async () => {
  const calls = [];
  const sleeps = [];
  let t = 1000;
  const fetchImpl = async (url, init) => {
    calls.push({ url, ua: init.headers["User-Agent"] });
    return fakeResponse(200, [{ lat: "12.97", lon: "77.59", display_name: "Bengaluru, India", boundingbox: ["12.8", "13.1", "77.4", "77.8"] }]);
  };
  const g = createGeocoder({ baseUrl: "https://nominatim.example", userAgent: "orbit-test", fetchImpl, now: () => t, sleep: async (ms) => { sleeps.push(ms); t += ms; } });
  const a = await g.resolve("Bengaluru");
  assert.deepEqual(a.bbox, [77.4, 12.8, 77.8, 13.1]);
  assert.equal(calls[0].ua, "orbit-test");
  assert.match(calls[0].url, /format=jsonv2/);
  await g.resolve("bengaluru");
  assert.equal(calls.length, 1);
  await g.resolve("Mysuru");
  assert.equal(calls.length, 2);
  assert.ok(sleeps.length >= 1);
});

test("geocoder reports unknown places and upstream failure with clear errors", async () => {
  const g = createGeocoder({ baseUrl: "https://n.example", userAgent: "t", fetchImpl: async () => fakeResponse(200, []), minIntervalMs: 0 });
  await assert.rejects(() => g.resolve("zzzz nowhere"), (e) => e.status === 404 && e.code === "place_not_found");
  const g2 = createGeocoder({ baseUrl: "https://n.example", userAgent: "t", fetchImpl: async () => { throw new Error("x"); }, minIntervalMs: 0 });
  await assert.rejects(() => g2.resolve("anywhere"), (e) => e.status === 502 && e.code === "geocoder_unavailable");
});

test("bbox and date helpers validate input", () => {
  assert.deepEqual(parseBbox("77.4,12.8,77.8,13.1"), [77.4, 12.8, 77.8, 13.1]);
  assert.throws(() => parseBbox("1,2,3"), /bbox/);
  assert.throws(() => parseBbox("170,0,-170,10"), /antimeridian/);
  const now = Date.parse("2026-10-17T12:00:00Z");
  const d = parseDateRange(undefined, undefined, now);
  assert.equal(d.end, "2026-10-17T12:00:00Z");
  assert.equal(d.start, "2026-09-17T12:00:00Z");
  assert.equal(parseDateRange("2026-01-01", "2026-01-31").end, "2026-01-31T23:59:59Z");
  assert.throws(() => parseDateRange("2026-02-01", "2026-01-01"), /before/);
  assert.throws(() => parseDateRange("2020-01-01", "2026-01-01"), /366/);
  assert.throws(() => parseDateRange("nope"), /valid date/);
});

// ---------- route tests (in-memory repo, fake provider) ----------
const config = { corsOrigin: "x", rateLimitPerMin: 1000, authRateLimit: 1000, searchRateLimit: 1000, jwtSecret: "x".repeat(40), jwtExpiresIn: "1h" };

function memoryAcquisitions() {
  const rows = new Map();
  return {
    rows,
    async findExistingIds(p, ids) { return new Map(ids.filter((i) => rows.has(`${p}:${i}`)).map((i) => [i, rows.get(`${p}:${i}`).id])); },
    async findById(id) { return [...rows.values()].find((r) => r.id === id) ?? null; },
    async upsert(rec, userId) {
      const key = `${rec.provider_id}:${rec.external_id}`;
      if (rows.has(key)) return { record: rows.get(key), created: false };
      const row = { ...rec, id: crypto.randomUUID(), ingested_by: userId };
      rows.set(key, row);
      return { record: row, created: true };
    },
  };
}

function setup({ provider, geocoder } = {}) {
  const acq = memoryAcquisitions();
  const prov = provider ?? new CopernicusProvider({
    stacUrl: STAC, sleep: noSleep,
    fetchImpl: async (url) => {
      if (url.includes("/items/")) return fakeResponse(200, feature());
      return fakeResponse(200, { features: [feature()], links: [{ rel: "next", method: "GET", href: `${STAC}search?token=next:abc` }] });
    },
  });
  const geo = geocoder ?? { resolve: async (q) => ({ lat: PIN.lat, lon: PIN.lon, bbox: [110, 60, 120, 70], display_name: q, source: "nominatim" }) };
  const server = createApp({ config, checks: {}, providers: new Map([["copernicus", prov]]), acquisitions: acq, geocoder: geo, now: () => Date.parse("2026-10-17T12:00:00Z") }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  return { base, acq, close: () => server.close() };
}
const PIN = { lat: 67.4313, lon: 114.9093 };
const token = () => jwt.sign({ role: "user" }, config.jwtSecret, { subject: crypto.randomUUID() });

test("search by place returns items with footprints, attribution and a cursor", async () => {
  const s = setup();
  const res = await fetch(`${s.base}/api/imagery/search?q=Bengaluru&type=Location&cloud_max=30`);
  const body = await res.json();
  s.close();
  assert.equal(res.status, 200);
  assert.equal(body.items[0].external_id, ID);
  assert.equal(body.items[0].footprint.type, "Polygon");
  assert.equal(body.items[0].ingested, false);
  assert.equal(body.items[0].assets, undefined);
  assert.ok(body.next_cursor);
  assert.match(body.attribution.imagery, /Copernicus/);
  assert.match(body.attribution.geocoding, /OpenStreetMap/);
});

test("search follows the cursor but refuses foreign URLs", async () => {
  const s = setup();
  const first = await (await fetch(`${s.base}/api/imagery/search?q=x`)).json();
  const next = await fetch(`${s.base}/api/imagery/search?cursor=${first.next_cursor}`);
  const evil = Buffer.from(JSON.stringify({ u: "https://evil.example.com/v1/search?token=1", p: null })).toString("base64url");
  const garbage = await fetch(`${s.base}/api/imagery/search?cursor=%%%not-base64`);
  assert.equal(garbage.status, 400);
  const bad = await fetch(`${s.base}/api/imagery/search?cursor=${evil}`);
  const badBody = await bad.json();
  s.close();
  assert.equal(next.status, 200);
  assert.equal(bad.status, 400);
  assert.equal(badBody.error.code, "invalid_cursor");
});

test("search validates input and explains unsupported categories", async () => {
  const s = setup();
  const get = async (qs) => ({ status: (await fetch(`${s.base}/api/imagery/search?${qs}`)).status, body: await (await fetch(`${s.base}/api/imagery/search?${qs}`)).json() });
  const none = await get("");
  const caps = await get("q=x&type=Captions");
  const badCol = await get("q=x&collection=landsat");
  const badBox = await get("bbox=1,2,3");
  const badCloud = await get("q=x&cloud_max=500");
  s.close();
  assert.equal(none.status, 400);
  assert.equal(none.body.error.code, "missing_location");
  assert.equal(caps.body.error.code, "unsupported_search_type");
  assert.equal(badCol.status, 400);
  assert.equal(badBox.status, 422);
  assert.equal(badCloud.status, 400);
});

test("provider outage and timeout become 502 / 504, not crashes", async () => {
  const mk = (err) => new CopernicusProvider({ stacUrl: STAC, retries: 0, sleep: noSleep, fetchImpl: async () => { throw err; } });
  const down = setup({ provider: mk(new Error("ECONNREFUSED")) });
  const r1 = await fetch(`${down.base}/api/imagery/search?q=x`);
  down.close();
  const slow = setup({ provider: mk(Object.assign(new Error("t"), { name: "TimeoutError" })) });
  const r2 = await fetch(`${slow.base}/api/imagery/search?q=x`);
  slow.close();
  assert.equal(r1.status, 502);
  assert.equal(r2.status, 504);
});

test("unknown place surfaces as a 404 from the geocoder", async () => {
  const s = setup({ geocoder: { resolve: async () => { const { HttpError } = await import("../src/errors.js"); throw new HttpError(404, "place_not_found", "No place found"); } } });
  const res = await fetch(`${s.base}/api/imagery/search?q=zzz`);
  s.close();
  assert.equal(res.status, 404);
});

test("ingest requires auth, is idempotent, and marks items as ingested in later searches", async () => {
  const s = setup();
  const post = (headers = {}) => fetch(`${s.base}/api/imagery/ingest`, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify({ collection: "sentinel-2-l2a", external_id: ID }) });
  const anon = await post();
  const auth = { Authorization: `Bearer ${token()}` };
  const first = await post(auth);
  const second = await post(auth);
  const firstBody = await first.json();
  const search = await (await fetch(`${s.base}/api/imagery/search?q=x`)).json();
  const byId = await fetch(`${s.base}/api/imagery/${firstBody.acquisition.id}`);
  s.close();
  assert.equal(anon.status, 401);
  assert.equal(first.status, 201);
  assert.equal(second.status, 200);
  assert.equal((await second.json()).created, false);
  assert.equal(s.acq.rows.size, 1);
  assert.equal(firstBody.acquisition.visual_asset_key, "TCI_10m");
  assert.equal(search.items[0].ingested, true);
  assert.equal(search.items[0].id, firstBody.acquisition.id);
  assert.equal(byId.status, 200);
});

test("ingest rejects invalid bodies and unusable catalogue items", async () => {
  const bad = new CopernicusProvider({ stacUrl: STAC, sleep: noSleep, fetchImpl: async () => fakeResponse(200, feature(ID, { properties: {} })) });
  const s = setup({ provider: bad });
  const h = { "Content-Type": "application/json", Authorization: `Bearer ${token()}` };
  const r1 = await fetch(`${s.base}/api/imagery/ingest`, { method: "POST", headers: h, body: JSON.stringify({ collection: "nope", external_id: "x" }) });
  const r2 = await fetch(`${s.base}/api/imagery/ingest`, { method: "POST", headers: h, body: JSON.stringify({ collection: "sentinel-2-l2a", external_id: ID }) });
  s.close();
  assert.equal(r1.status, 400);
  assert.equal(r2.status, 422);
  assert.equal(s.acq.rows.size, 0);
});

test("GET /imagery/:id validates ids and returns 404 for unknown acquisitions", async () => {
  const s = setup();
  const bad = await fetch(`${s.base}/api/imagery/not-a-uuid`);
  const missing = await fetch(`${s.base}/api/imagery/${crypto.randomUUID()}`);
  s.close();
  assert.equal(bad.status, 400);
  assert.equal(missing.status, 404);
});

test("pointInGeometry handles polygons, holes and multipolygons", () => {
  const square = { type: "Polygon", coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]] };
  const holed = { type: "Polygon", coordinates: [square.coordinates[0], [[4, 4], [6, 4], [6, 6], [4, 6], [4, 4]]] };
  const multi = { type: "MultiPolygon", coordinates: [square.coordinates, [[[20, 20], [30, 20], [30, 30], [20, 30], [20, 20]]]] };
  assert.equal(pointInGeometry(square, 5, 5), true);
  assert.equal(pointInGeometry(square, 11, 5), false);
  assert.equal(pointInGeometry(holed, 5, 5), false);
  assert.equal(pointInGeometry(holed, 2, 2), true);
  assert.equal(pointInGeometry(multi, 25, 25), true);
  assert.equal(pointInGeometry(multi, 15, 15), false);
  assert.equal(pointInGeometry({ type: "Point", coordinates: [0, 0] }, 0, 0), false);
  assert.equal(pointInGeometry(null, 0, 0), false);
});

test("pointBbox is a tiny box around the pin and stays within valid ranges", () => {
  const b = pointBbox(12.97, 77.59);
  assert.ok(b[2] - b[0] < 0.01 && b[3] - b[1] < 0.01);
  assert.ok(b[0] < 77.59 && b[2] > 77.59 && b[1] < 12.97 && b[3] > 12.97);
  assert.deepEqual(pointBbox(90, 180).slice(2), [180, 90]);
});

function spySetup(features, geocoder) {
  const urls = [];
  const provider = new CopernicusProvider({
    stacUrl: STAC, sleep: noSleep,
    fetchImpl: async (url) => { urls.push(new URL(url)); return fakeResponse(200, { features, links: [{ rel: "next", method: "GET", href: `${STAC}search?token=next:abc` }] }); },
  });
  return { ...setup({ provider, geocoder }), urls };
}

const far = () => feature("FAR_SCENE", { geometry: { type: "Polygon", coordinates: [[[10, 10], [11, 10], [11, 11], [10, 11], [10, 10]]] } });

test("lat/lon search queries a tiny box and keeps only scenes that contain the pin", async () => {
  const s = spySetup([feature(), far()]);
  const res = await fetch(`${s.base}/api/imagery/search?lat=${PIN.lat}&lon=${PIN.lon}`);
  const body = await res.json();
  s.close();
  const [w, so, e, n] = s.urls[0].searchParams.get("bbox").split(",").map(Number);
  assert.ok(e - w < 0.01 && n - so < 0.01);
  assert.equal(body.items.length, 1);
  assert.equal(body.items[0].external_id, ID);
  assert.equal(body.filtered_out, 1);
  assert.deepEqual(body.point, { lat: PIN.lat, lon: PIN.lon });
});

test("a place name searches at its point, not its whole bounding box", async () => {
  const s = spySetup([feature()]);
  const body = await (await fetch(`${s.base}/api/imagery/search?q=Somewhere`)).json();
  s.close();
  const [w, , e] = s.urls[0].searchParams.get("bbox").split(",").map(Number);
  assert.ok(e - w < 0.01);
  assert.equal(body.place.lat, PIN.lat);
  assert.equal(body.place.lon, PIN.lon);
  assert.deepEqual(body.point, { lat: PIN.lat, lon: PIN.lon });
});

test("the pagination cursor remembers the pin so later pages are filtered the same way", async () => {
  const s = spySetup([feature(), far()]);
  const first = await (await fetch(`${s.base}/api/imagery/search?lat=${PIN.lat}&lon=${PIN.lon}`)).json();
  const next = await (await fetch(`${s.base}/api/imagery/search?cursor=${first.next_cursor}`)).json();
  s.close();
  assert.equal(next.items.length, 1);
  assert.equal(next.filtered_out, 1);
  assert.deepEqual(next.point, { lat: PIN.lat, lon: PIN.lon });
});

test("an explicit bbox still returns every intersecting scene (area search)", async () => {
  const s = spySetup([feature(), far()]);
  const body = await (await fetch(`${s.base}/api/imagery/search?bbox=0,0,50,80`)).json();
  s.close();
  assert.equal(body.items.length, 2);
  assert.equal(body.point, null);
});

test("lat without lon, or out-of-range lat, is rejected", async () => {
  const s = setup();
  const a = await fetch(`${s.base}/api/imagery/search?lat=12`);
  const b = await fetch(`${s.base}/api/imagery/search?lat=120&lon=10`);
  s.close();
  assert.equal(a.status, 400);
  assert.equal(b.status, 400);
});
