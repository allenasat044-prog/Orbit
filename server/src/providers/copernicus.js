import { ImageryProvider } from "./base.js";
import { fetchJson, ProviderError } from "./http.js";

export const COLLECTIONS = ["sentinel-2-l2a", "sentinel-2-l1c", "sentinel-1-grd"];

export class InvalidItemError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidItemError";
  }
}

const DROP_PROPERTIES = new Set(["_private", "auth:schemes", "storage:schemes"]);
const num = (v) => (typeof v === "number" && Number.isFinite(v) ? v : null);

function compactAssets(assets = {}) {
  const out = {};
  for (const [key, a] of Object.entries(assets)) {
    const s3 = typeof a.href === "string" && a.href.startsWith("s3://") ? a.href : null;
    const https = a.alternate?.https?.href ?? (typeof a.href === "string" && a.href.startsWith("http") ? a.href : null);
    out[key] = {
      title: a.title ?? null,
      type: a.type ?? null,
      roles: a.roles ?? [],
      gsd: num(a.gsd),
      size: num(a["file:size"]),
      s3_href: s3,
      https_href: https,
      bands: (a.bands ?? []).map((b) => ({
        name: b.name ?? null,
        common_name: b["eo:common_name"] ?? null,
        center_wavelength: num(b["eo:center_wavelength"]),
      })),
    };
  }
  return out;
}

function pickVisualAsset(assets) {
  const candidates = Object.entries(assets).filter(([, a]) => a.roles.includes("visual"));
  candidates.sort((a, b) => (a[1].gsd ?? Infinity) - (b[1].gsd ?? Infinity));
  return candidates[0]?.[0] ?? null;
}

export function normalizeItem(feature, providerId = "copernicus") {
  const p = feature?.properties ?? {};
  const geometry = feature?.geometry;
  const acquiredAt = p.datetime ?? p.start_datetime;
  if (!feature?.id) throw new InvalidItemError("Item has no id");
  if (!acquiredAt || Number.isNaN(Date.parse(acquiredAt))) throw new InvalidItemError("Item has no valid acquisition time");
  if (!geometry || !["Polygon", "MultiPolygon"].includes(geometry.type)) throw new InvalidItemError("Item has no polygon footprint");

  const assets = compactAssets(feature.assets);
  const year = new Date(acquiredAt).getUTCFullYear();
  const properties = Object.fromEntries(Object.entries(p).filter(([k]) => !DROP_PROPERTIES.has(k)));

  return {
    provider_id: providerId,
    collection: feature.collection ?? null,
    external_id: String(feature.id),
    acquired_at: new Date(acquiredAt).toISOString(),
    platform: p.platform ?? null,
    constellation: p.constellation ?? null,
    instruments: Array.isArray(p.instruments) ? p.instruments : null,
    processing_level: p["processing:level"] ?? null,
    product_type: p["product:type"] ?? null,
    grid_code: p["grid:code"] ?? null,
    cloud_cover: num(p["eo:cloud_cover"]),
    gsd: num(p.gsd),
    footprint: geometry,
    bbox: Array.isArray(feature.bbox) ? feature.bbox : null,
    stac_url: feature.links?.find((l) => l.rel === "self")?.href ?? null,
    visual_asset_key: pickVisualAsset(assets),
    assets,
    properties,
    attribution: `Contains Copernicus Sentinel data ${year}. Accessed via the Copernicus Data Space Ecosystem.`,
  };
}

export class CopernicusProvider extends ImageryProvider {
  constructor({ stacUrl, timeoutMs = 20000, retries = 2, fetchImpl, sleep }) {
    super({ id: "copernicus", name: "Copernicus Data Space Ecosystem" });
    this.stacUrl = stacUrl.endsWith("/") ? stacUrl : `${stacUrl}/`;
    this.timeoutMs = timeoutMs;
    this.retries = retries;
    this.fetchImpl = fetchImpl;
    this.sleep = sleep;
  }

  get httpOpts() {
    return { timeoutMs: this.timeoutMs, retries: this.retries, fetchImpl: this.fetchImpl, sleep: this.sleep };
  }

  async healthCheck() {
    const body = await fetchJson(this.stacUrl, { ...this.httpOpts, retries: 0, timeoutMs: Math.min(this.timeoutMs, 5000) });
    return { stac_version: body.stac_version ?? null, title: body.title ?? null };
  }

  buildSearchUrl({ collection, bbox, start, end, cloudMax, limit, sortByDate = true }) {
    const q = new URLSearchParams();
    q.set("collections", collection);
    q.set("bbox", bbox.join(","));
    q.set("datetime", `${start}/${end}`);
    q.set("limit", String(limit));
    q.set("fields", "-assets");
    if (sortByDate) q.set("sortby", "-properties.datetime");
    if (cloudMax !== undefined && cloudMax !== null && collection.startsWith("sentinel-2")) {
      q.set("filter-lang", "cql2-text");
      q.set("filter", `eo:cloud_cover<=${cloudMax}`);
    }
    return `${this.stacUrl}search?${q.toString()}`;
  }

  isAllowedCursor(href) {
    try {
      const u = new URL(href);
      const base = new URL(this.stacUrl);
      return u.origin === base.origin && u.pathname.startsWith(base.pathname) && u.pathname.endsWith("/search");
    } catch {
      return false;
    }
  }

  async search(params) {
    const { cursorUrl } = params;
    let body;
    if (cursorUrl) {
      body = await fetchJson(cursorUrl, this.httpOpts);
    } else {
      try {
        body = await fetchJson(this.buildSearchUrl(params), this.httpOpts);
      } catch (err) {
        if (err instanceof ProviderError && (err.status === 400 || err.status === 422)) {
          body = await fetchJson(this.buildSearchUrl({ ...params, sortByDate: false }), this.httpOpts);
        } else {
          throw err;
        }
      }
    }

    const items = [];
    let skipped = 0;
    for (const feature of body.features ?? []) {
      try {
        items.push(normalizeItem(feature, this.id));
      } catch (err) {
        if (err instanceof InvalidItemError) skipped++;
        else throw err;
      }
    }
    const next = (body.links ?? []).find((l) => l.rel === "next" && (l.method ?? "GET") === "GET");
    return { items, nextUrl: next?.href ?? null, skipped };
  }

  async getItem({ collection, id }) {
    const body = await fetchJson(`${this.stacUrl}collections/${encodeURIComponent(collection)}/items/${encodeURIComponent(id)}`, this.httpOpts);
    return normalizeItem(body, this.id);
  }
}
