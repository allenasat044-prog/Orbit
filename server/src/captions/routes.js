import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { publicJob } from "../imagery/chipRoutes.js";
import { promptKey } from "./repo.js";
import { DEFAULT_MODEL_ID } from "./job.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const bodySchema = z.object({
  chip_id: z.string({ required_error: "chip_id is required" }).regex(UUID, "chip_id must be a UUID"),
  model_id: z.string().min(1).max(100).default(DEFAULT_MODEL_ID),
  prompt: z.string().trim().min(1).max(1000).optional(),
});

export const publicCaption = (c) => ({
  id: c.id,
  chip_id: c.chip_id,
  acquisition_id: c.acquisition_id,
  caption: c.caption,
  model: { id: c.model_id, checkpoint: c.checkpoint, revision: c.revision, device: c.device, dtype: c.dtype },
  prompt: c.prompt,
  latency_ms: c.latency_ms,
  created_at: c.created_at,
  image_url: `/api/chips/${c.chip_id}/image`,
  ai_generated: true,
});

const TS = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}(:?\d{2})?|Z)$/;

const listSchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  cursor: z.string().max(500).optional(),
});

const encodeCursor = (row) => Buffer.from(JSON.stringify({ t: row.created_at_raw, id: row.id }), "utf8").toString("base64url");
function decodeCursor(c) {
  try {
    const { t, id } = JSON.parse(Buffer.from(c, "base64url").toString("utf8"));
    if (typeof t !== "string" || !TS.test(t) || typeof id !== "string" || !UUID.test(id)) throw new Error("bad");
    return { t, id };
  } catch {
    throw new HttpError(400, "invalid_cursor", "Invalid pagination cursor.");
  }
}

export const publicListItem = (r) => ({
  ...publicCaption(r),
  scene: { id: r.scene_id, acquired_at: r.acquired_at, platform: r.platform },
  location: { lat: r.center_lat, lon: r.center_lon },
  size_px: r.size_px,
  gsd_m: r.gsd_m,
});

function mapMlError(err) {
  if (err.code === "ml_service_unavailable" || err.code === "ml_service_timeout") return new HttpError(502, err.code, err.message);
  return new HttpError(err.status && err.status < 500 ? err.status : 502, err.code ?? "ml_service_error", err.message);
}

export function createCaptionRouter({ config, chips, captions, runner, ml }) {
  const router = express.Router();
  const auth = requireAuth(config);

  router.post(
    "/captions",
    auth,
    rateLimit({ windowMs: 60_000, limit: config.captionRateLimit ?? 20, standardHeaders: true, legacyHeaders: false, handler: (_q, res) => sendError(res, 429, "rate_limited", "Too many caption requests. Try again in a minute.") }),
    asyncHandler(async (req, res) => {
      const parsed = bodySchema.safeParse(req.body ?? {});
      if (!parsed.success) throw new HttpError(400, "validation_error", `${parsed.error.issues[0].path.join(".") || "request"}: ${parsed.error.issues[0].message}`);
      const { chip_id, model_id, prompt } = parsed.data;
      const chip = await chips.findById(chip_id);
      if (!chip) throw new HttpError(404, "not_found", "Preview image not found.");
      const existing = await captions.find(chip.id, model_id, promptKey(prompt));
      if (existing) return res.status(200).json({ caption: publicCaption(existing), job: null });
      const job = await runner.enqueue("generate_caption", { chip_id: chip.id, model_id, prompt: prompt ?? null }, req.auth.userId);
      res.status(202).json({ job: publicJob(job), caption: null });
    }),
  );

  router.get(
    "/captions",
    auth,
    asyncHandler(async (req, res) => {
      const q = listSchema.safeParse({ limit: req.query.limit || undefined, cursor: req.query.cursor || undefined });
      if (!q.success) throw new HttpError(400, "validation_error", `${q.error.issues[0].path.join(".") || "request"}: ${q.error.issues[0].message}`);
      const after = q.data.cursor ? decodeCursor(q.data.cursor) : null;
      const rows = await captions.listForUser(req.auth.userId, { limit: q.data.limit + 1, after });
      const page = rows.slice(0, q.data.limit);
      res.json({ items: page.map(publicListItem), next_cursor: rows.length > q.data.limit ? encodeCursor(page[page.length - 1]) : null });
    }),
  );

  router.delete(
    "/captions/:id",
    auth,
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Caption id must be a UUID.");
      const row = await captions.findById(req.params.id);
      if (!row || (row.created_by !== req.auth.userId && req.auth.role !== "admin")) throw new HttpError(404, "not_found", "Caption not found.");
      await captions.remove(row.id);
      res.status(204).end();
    }),
  );

  router.get(
    "/captions/:id",
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Caption id must be a UUID.");
      const row = await captions.findById(req.params.id);
      if (!row) throw new HttpError(404, "not_found", "Caption not found.");
      res.json({ caption: publicCaption(row) });
    }),
  );

  router.get(
    "/models",
    asyncHandler(async (_req, res) => {
      try {
        res.json(await ml.models());
      } catch (err) {
        throw mapMlError(err);
      }
    }),
  );

  router.get(
    "/models/:id",
    asyncHandler(async (req, res) => {
      try {
        res.json({ model: await ml.model(req.params.id) });
      } catch (err) {
        throw mapMlError(err);
      }
    }),
  );

  return router;
}
