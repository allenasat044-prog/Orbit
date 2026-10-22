import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { publicJob } from "../imagery/chipRoutes.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const bodySchema = z.object({
  chip_id: z.string({ required_error: "chip_id is required" }).regex(UUID, "chip_id must be a UUID"),
  model_ids: z.array(z.string().min(1).max(100)).min(1).max(8).optional(),
});

export const publicComparison = (c) => ({
  id: c.id,
  chip_id: c.chip_id,
  created_at: c.created_at,
  image_url: `/api/chips/${c.chip_id}/image`,
  results: c.results,
  scene_tags: c.scene_tags,
  scene_model: c.scene_model,
  scene_error: c.scene_error,
  unavailable: c.unavailable,
  ai_generated: true,
  note: "Alignment is a cosine similarity between the image and each caption from an image-text matching model. It is a rough signal, not a measure of truth.",
});

export function createComparisonRouter({ config, chips, comparisons, runner }) {
  const router = express.Router();
  const auth = requireAuth(config);

  router.post(
    "/captions/compare-models",
    auth,
    rateLimit({ windowMs: 60_000, limit: 10, standardHeaders: true, legacyHeaders: false, handler: (_q, res) => sendError(res, 429, "rate_limited", "Too many comparisons. Try again in a minute.") }),
    asyncHandler(async (req, res) => {
      const parsed = bodySchema.safeParse(req.body ?? {});
      if (!parsed.success) throw new HttpError(400, "validation_error", `${parsed.error.issues[0].path.join(".") || "request"}: ${parsed.error.issues[0].message}`);
      const chip = await chips.findById(parsed.data.chip_id);
      if (!chip) throw new HttpError(404, "not_found", "Preview image not found.");
      const job = await runner.enqueue("compare_models", { chip_id: chip.id, model_ids: parsed.data.model_ids ?? null }, req.auth.userId);
      res.status(202).json({ job: publicJob(job) });
    }),
  );

  router.get(
    "/comparisons/:id",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Comparison id must be a UUID.");
      const row = await comparisons.findById(req.params.id);
      if (!row) throw new HttpError(404, "not_found", "Comparison not found.");
      res.json({ comparison: publicComparison(row) });
    }),
  );

  return router;
}
