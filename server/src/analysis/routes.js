import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { publicJob } from "../imagery/chipRoutes.js";
import { pointInGeometry } from "../imagery/geo.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const bodySchema = z.object({
  before_id: z.string({ required_error: "before_id is required" }).regex(UUID, "before_id must be a UUID"),
  after_id: z.string({ required_error: "after_id is required" }).regex(UUID, "after_id must be a UUID"),
  lat: z.number({ required_error: "lat is required" }).min(-90).max(90),
  lon: z.number({ required_error: "lon is required" }).min(-180).max(180),
  size_px: z.number().int().min(128).max(512).default(256),
});

const side = (a, prefix) => ({
  chip_id: a[`${prefix}_chip_id`],
  scene_id: a[`${prefix}_scene`],
  acquired_at: a[`${prefix}_acquired_at`],
  platform: a[`${prefix}_platform`],
  cloud_cover: a[`${prefix}_cloud`],
  image_url: `/api/chips/${a[`${prefix}_chip_id`]}/image`,
  display_url: `/api/chips/${a[`${prefix}_chip_id`]}/image?variant=display`,
});

export const publicAnalysis = (a) => {
  const ring = a.bounds?.coordinates?.[0];
  return {
    id: a.id,
    status: a.status,
    scl_used: a.scl_used,
    location: { lat: a.center_lat, lon: a.center_lon },
    size_px: a.size_px,
    bounds: ring ? { west: ring[0][0], north: ring[0][1], east: ring[2][0], south: ring[2][1] } : null,
    before: side(a, "before"),
    after: side(a, "after"),
    results: a.results,
    notes: a.notes,
    overlay_url: a.overlay_path ? `/api/analysis/${a.id}/overlay` : null,
    created_at: a.created_at,
    method: "Image differencing after matching brightness and contrast, with cloud and shadow masking when the scene classification layer is available.",
    caveat: "Differences between two images are not confirmed real-world events. Lighting, season, haze and alignment can all create apparent change.",
  };
};

export function createAnalysisRouter({ config, acquisitions, analyses, runner, storage }) {
  const router = express.Router();
  const auth = requireAuth(config);

  router.post(
    "/analysis/compare",
    auth,
    rateLimit({ windowMs: 60_000, limit: 10, standardHeaders: true, legacyHeaders: false, handler: (_q, res) => sendError(res, 429, "rate_limited", "Too many analyses. Try again in a minute.") }),
    asyncHandler(async (req, res) => {
      const parsed = bodySchema.safeParse(req.body ?? {});
      if (!parsed.success) throw new HttpError(400, "validation_error", `${parsed.error.issues[0].path.join(".") || "request"}: ${parsed.error.issues[0].message}`);
      const { before_id, after_id, lat, lon, size_px } = parsed.data;
      if (before_id === after_id) throw new HttpError(422, "same_scene", "Pick two different scenes.");
      for (const id of [before_id, after_id]) {
        const acq = await acquisitions.findById(id);
        if (!acq) throw new HttpError(404, "not_found", "One of the scenes was not found. Register it first.");
        if (!pointInGeometry(acq.footprint, lon, lat)) throw new HttpError(422, "point_outside_scene", "The pin is not inside both scenes' footprints.");
        if (!acq.visual_asset_key) throw new HttpError(422, "no_visual_asset", "One of the scenes has no true-colour image asset.");
      }
      const job = await runner.enqueue("analyze_change", { before_id, after_id, lat, lon, size_px }, req.auth.userId);
      res.status(202).json({ job: publicJob(job) });
    }),
  );

  router.get(
    "/analysis/:id",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Analysis id must be a UUID.");
      const row = await analyses.findById(req.params.id);
      if (!row) throw new HttpError(404, "not_found", "Analysis not found.");
      res.json({ analysis: publicAnalysis(row) });
    }),
  );

  router.get(
    "/analysis/:id/overlay",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Analysis id must be a UUID.");
      const row = await analyses.findById(req.params.id);
      if (!row || !row.overlay_path) throw new HttpError(404, "not_found", "No change overlay for this analysis.");
      res.set({ "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable", "Cross-Origin-Resource-Policy": "cross-origin" });
      res.sendFile(storage.resolve(row.overlay_path), (err) => {
        if (err && !res.headersSent) res.status(404).json({ error: { code: "image_missing", message: "The overlay file is missing." } });
      });
    }),
  );

  return router;
}
