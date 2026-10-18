import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { ProviderError } from "../providers/http.js";
import { COLLECTIONS } from "../providers/copernicus.js";
import { pointBbox, pointInGeometry } from "./geo.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DAY_MS = 86_400_000;
const empty = (v) => (v === "" || v === null ? undefined : v);

const searchSchema = z.object({
  q: z.preprocess(empty, z.string().trim().max(200).optional()),
  lat: z.preprocess(empty, z.coerce.number().min(-90).max(90).optional()),
  lon: z.preprocess(empty, z.coerce.number().min(-180).max(180).optional()),
  bbox: z.preprocess(empty, z.string().max(100).optional()),
  start: z.preprocess(empty, z.string().max(40).optional()),
  end: z.preprocess(empty, z.string().max(40).optional()),
  collection: z.preprocess(empty, z.enum(COLLECTIONS).default("sentinel-2-l2a")),
  cloud_max: z.preprocess(empty, z.coerce.number().min(0).max(100).optional()),
  limit: z.preprocess(empty, z.coerce.number().int().min(1).max(50).default(20)),
  cursor: z.preprocess(empty, z.string().max(4000).optional()),
  provider: z.preprocess(empty, z.string().max(50).default("copernicus")),
  type: z.preprocess(empty, z.enum(["All", "Location", "Imagery", "Captions", "Regions"]).optional()),
});

const ingestSchema = z.object({
  provider: z.string().max(50).default("copernicus"),
  collection: z.enum(COLLECTIONS),
  external_id: z.string().min(1).max(300),
});

function validate(schema, input) {
  const r = schema.safeParse(input ?? {});
  if (!r.success) {
    const issues = r.error.issues;
    throw new HttpError(400, "validation_error", `${issues[0].path.join(".") || "request"}: ${issues[0].message}`, issues.map((i) => ({ field: i.path.join("."), message: i.message })));
  }
  return r.data;
}

export function parseBbox(s) {
  const parts = s.split(",").map((x) => Number(x.trim()));
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) throw new HttpError(422, "invalid_bbox", "bbox must be 'minLon,minLat,maxLon,maxLat'.");
  const [w, so, e, n] = parts;
  if (w < -180 || e > 180 || so < -90 || n > 90) throw new HttpError(422, "invalid_bbox", "bbox is outside valid longitude/latitude ranges.");
  if (w >= e || so >= n) throw new HttpError(422, "invalid_bbox", "bbox must have minLon < maxLon and minLat < maxLat (antimeridian crossing is not supported).");
  return parts;
}

export function parseDateRange(start, end, now = Date.now()) {
  const parse = (s, endOfDay) => {
    const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(s);
    const d = new Date(dateOnly ? `${s}T${endOfDay ? "23:59:59" : "00:00:00"}Z` : s);
    if (Number.isNaN(d.getTime())) throw new HttpError(422, "invalid_date", `"${s}" is not a valid date. Use YYYY-MM-DD.`);
    return d;
  };
  const endD = end ? parse(end, true) : new Date(now);
  const startD = start ? parse(start, false) : new Date(endD.getTime() - 30 * DAY_MS);
  if (startD > endD) throw new HttpError(422, "invalid_date_range", "start must be before end.");
  if (endD - startD > 366 * DAY_MS) throw new HttpError(422, "date_range_too_long", "Date range cannot exceed 366 days.");
  const iso = (d) => d.toISOString().replace(/\.\d{3}Z$/, "Z");
  return { start: iso(startD), end: iso(endD) };
}

const encodeCursor = (href, point) => Buffer.from(JSON.stringify({ u: href, p: point ? [point.lon, point.lat] : null }), "utf8").toString("base64url");
function decodeCursor(c) {
  try {
    const { u, p } = JSON.parse(Buffer.from(c, "base64url").toString("utf8"));
    if (typeof u !== "string") throw new Error("bad");
    const point = Array.isArray(p) && p.length === 2 && p.every(Number.isFinite) ? { lon: p[0], lat: p[1] } : null;
    return { href: u, point };
  } catch {
    throw new HttpError(400, "invalid_cursor", "Invalid pagination cursor.");
  }
}

function mapProviderError(err) {
  if (!(err instanceof ProviderError)) return err;
  if (err.code === "not_found") return new HttpError(404, "not_found_at_provider", "That item was not found at the imagery provider.");
  if (err.code === "provider_timeout") return new HttpError(504, "provider_timeout", "The imagery provider timed out. Try again shortly.");
  const details = err.status ? { upstream_status: err.status, upstream_body: err.body } : undefined;
  return new HttpError(502, "provider_unavailable", "The imagery provider is unavailable or rejected the request.", details);
}

const publicItem = (it, existing) => ({
  provider: it.provider_id,
  collection: it.collection,
  external_id: it.external_id,
  acquired_at: it.acquired_at,
  platform: it.platform,
  constellation: it.constellation,
  instruments: it.instruments,
  cloud_cover: it.cloud_cover,
  gsd: it.gsd,
  processing_level: it.processing_level,
  product_type: it.product_type,
  grid_code: it.grid_code,
  bbox: it.bbox,
  footprint: it.footprint,
  stac_url: it.stac_url,
  attribution: it.attribution,
  ingested: existing.has(it.external_id),
  id: existing.get(it.external_id) ?? null,
});

export function createImageryRouter({ config, providers, acquisitions, geocoder, now = Date.now }) {
  const router = express.Router();
  const getProvider = (id) => {
    const p = providers.get(id);
    if (!p) throw new HttpError(400, "unknown_provider", `Unknown provider "${id}".`);
    return p;
  };

  router.get(
    "/search",
    rateLimit({
      windowMs: 60_000,
      limit: config.searchRateLimit,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, res) => sendError(res, 429, "rate_limited", "Too many searches. Try again in a minute."),
    }),
    asyncHandler(async (req, res) => {
      const p = validate(searchSchema, req.query);
      if (p.type === "Captions" || p.type === "Regions") {
        throw new HttpError(400, "unsupported_search_type", `Searching ${p.type} is not available yet.`);
      }
      const provider = getProvider(p.provider);
      let result;
      let query;
      let place = null;

      let point = null;
      try {
        if (p.cursor) {
          const c = decodeCursor(p.cursor);
          if (!provider.isAllowedCursor(c.href)) throw new HttpError(400, "invalid_cursor", "Invalid pagination cursor.");
          point = c.point;
          result = await provider.search({ cursorUrl: c.href });
          query = { collection: p.collection, cursor: true };
        } else {
          if ((p.lat === undefined) !== (p.lon === undefined)) throw new HttpError(400, "validation_error", "lat and lon must be given together.");
          let bbox;
          if (p.lat !== undefined) {
            point = { lat: p.lat, lon: p.lon };
            bbox = pointBbox(point.lat, point.lon);
          } else if (p.bbox) {
            bbox = parseBbox(p.bbox);
          } else if (p.q) {
            place = await geocoder.resolve(p.q);
            point = { lat: place.lat, lon: place.lon };
            bbox = pointBbox(point.lat, point.lon);
          } else {
            throw new HttpError(400, "missing_location", "Enter a place name or coordinates like '12.97,77.59', or click the globe to drop a pin.");
          }
          const { start, end } = parseDateRange(p.start, p.end, now());
          query = { collection: p.collection, bbox, point, start, end, cloud_max: p.cloud_max ?? null, limit: p.limit };
          result = await provider.search({ collection: p.collection, bbox, start, end, cloudMax: p.cloud_max, limit: p.limit });
        }
      } catch (err) {
        throw mapProviderError(err);
      }

      const covering = point ? result.items.filter((it) => pointInGeometry(it.footprint, point.lon, point.lat)) : result.items;
      const filteredOut = result.items.length - covering.length;
      result = { ...result, items: covering };

      const existing = await acquisitions.findExistingIds(provider.id, result.items.map((i) => i.external_id));
      res.json({
        items: result.items.map((i) => publicItem(i, existing)),
        next_cursor: result.nextUrl ? encodeCursor(result.nextUrl, point) : null,
        skipped: result.skipped,
        filtered_out: filteredOut,
        point,
        query,
        place: place ? { name: place.display_name, lat: place.lat, lon: place.lon, bbox: place.bbox, source: place.source } : null,
        attribution: {
          imagery: "Contains Copernicus Sentinel data. Accessed via the Copernicus Data Space Ecosystem.",
          geocoding: place?.source === "nominatim" ? "Place search © OpenStreetMap contributors" : null,
        },
      });
    }),
  );

  router.post(
    "/ingest",
    requireAuth(config),
    asyncHandler(async (req, res) => {
      const body = validate(ingestSchema, req.body);
      const provider = getProvider(body.provider);
      let record;
      try {
        record = await provider.getItem({ collection: body.collection, id: body.external_id });
      } catch (err) {
        if (err?.name === "InvalidItemError") throw new HttpError(422, "invalid_item", err.message);
        throw mapProviderError(err);
      }
      const { record: saved, created } = await acquisitions.upsert(record, req.auth.userId);
      res.status(created ? 201 : 200).json({ created, acquisition: saved });
    }),
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Acquisition id must be a UUID.");
      const row = await acquisitions.findById(req.params.id);
      if (!row) throw new HttpError(404, "not_found", "Acquisition not found.");
      res.json({ acquisition: row });
    }),
  );

  return router;
}
