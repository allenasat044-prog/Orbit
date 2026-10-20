import fs from "node:fs";
import express from "express";
import { z } from "zod";
import { HttpError, asyncHandler } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { pointInGeometry } from "./geo.js";
import { chipKey } from "./chipJob.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const chipSchema = z.object({
  lat: z.number({ required_error: "lat is required" }).min(-90).max(90),
  lon: z.number({ required_error: "lon is required" }).min(-180).max(180),
  size_px: z.number().int().min(128).max(1024).default(512),
});

export const publicChip = (c) => ({
  id: c.id,
  acquisition_id: c.acquisition_id,
  center: { lat: c.center_lat, lon: c.center_lon },
  size_px: c.size_px,
  width_px: c.width_px,
  height_px: c.height_px,
  pin_px: { x: c.pin_x, y: c.pin_y },
  gsd_m: c.gsd_m,
  crs: c.crs,
  nodata_fraction: c.nodata_fraction,
  bounds: c.bounds,
  sha256: c.sha256,
  created_at: c.created_at,
  image_url: `/api/chips/${c.id}/image`,
  display_url: `/api/chips/${c.id}/image?variant=display`,
});

export const publicJob = (j) => ({
  id: j.id,
  type: j.type,
  status: j.status,
  params: j.params,
  result: j.result,
  error: j.error,
  attempts: j.attempts,
  created_at: j.created_at,
  started_at: j.started_at,
  finished_at: j.finished_at,
});

export function createChipRouter({ config, acquisitions, chips, jobs, runner, storage }) {
  const router = express.Router();
  const auth = requireAuth(config);

  router.post(
    "/imagery/:id/chip",
    auth,
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Acquisition id must be a UUID.");
      const parsed = chipSchema.safeParse(req.body ?? {});
      if (!parsed.success) throw new HttpError(400, "validation_error", `${parsed.error.issues[0].path.join(".") || "request"}: ${parsed.error.issues[0].message}`);
      const { lat, lon, size_px } = parsed.data;

      const acq = await acquisitions.findById(req.params.id);
      if (!acq) throw new HttpError(404, "not_found", "Acquisition not found.");
      if (!pointInGeometry(acq.footprint, lon, lat)) throw new HttpError(422, "point_outside_scene", "The pin is not inside this scene's footprint.");
      if (!acq.visual_asset_key) throw new HttpError(422, "no_visual_asset", "This scene has no true-colour image asset.");

      const existing = await chips.findByKey(acq.id, chipKey(lon, lat, size_px));
      if (existing) return res.status(200).json({ chip: publicChip(existing), job: null });

      const job = await runner.enqueue("prepare_chip", { acquisition_id: acq.id, lon, lat, size_px }, req.auth.userId);
      res.status(202).json({ job: publicJob(job), chip: null });
    }),
  );

  router.get(
    "/jobs/:id",
    auth,
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Job id must be a UUID.");
      const job = await jobs.get(req.params.id);
      if (!job || (job.created_by !== req.auth.userId && req.auth.role !== "admin")) throw new HttpError(404, "not_found", "Job not found.");
      res.json({ job: publicJob(job) });
    }),
  );

  router.get(
    "/chips/:id",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Chip id must be a UUID.");
      const chip = await chips.findById(req.params.id);
      if (!chip) throw new HttpError(404, "not_found", "Chip not found.");
      res.json({ chip: publicChip(chip) });
    }),
  );

  router.get(
    "/chips/:id/image",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Chip id must be a UUID.");
      const chip = await chips.findById(req.params.id);
      if (!chip) throw new HttpError(404, "not_found", "Chip not found.");
      res.set({ "Content-Type": "image/png", "Cache-Control": "public, max-age=31536000, immutable", "Cross-Origin-Resource-Policy": "cross-origin" });
      const native = storage.resolve(chip.storage_path);
      const display = native.replace(/\.png$/, ".display.png");
      const file = req.query.variant === "display" && fs.existsSync(display) ? display : native;
      res.sendFile(file, (err) => {
        if (err && !res.headersSent) res.status(404).json({ error: { code: "image_missing", message: "Chip image file is missing." } });
      });
    }),
  );

  return router;
}
