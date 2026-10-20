import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { publicJob } from "../imagery/chipRoutes.js";
import { RunInProgressError } from "./repo.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TS = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(\.\d+)?([+-]\d{2}(:?\d{2})?|Z)$/;

const listSchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).default(100),
  cursor: z.string().max(500).optional(),
});

export const publicRun = (r) => ({
  id: r.id,
  trigger: r.trigger,
  status: r.status,
  started_at: r.started_at,
  finished_at: r.finished_at,
  regions_checked: r.regions_checked,
  new_acquisitions: r.new_acquisitions,
  captions_created: r.captions_created,
  failed_tasks: r.failed_tasks,
});

const encodeCursor = (row) => Buffer.from(JSON.stringify({ t: row.started_at_raw, id: row.id }), "utf8").toString("base64url");
function decodeCursor(c) {
  try {
    const { t, id } = JSON.parse(Buffer.from(c, "base64url").toString("utf8"));
    if (typeof t !== "string" || !TS.test(t) || typeof id !== "string" || !UUID.test(id)) throw new Error("bad");
    return { t, id };
  } catch {
    throw new HttpError(400, "invalid_cursor", "Invalid pagination cursor.");
  }
}

export function createUpdateRouter({ config, runs, runner }) {
  const router = express.Router();
  const auth = requireAuth(config);

  router.post(
    "/updates/run",
    auth,
    rateLimit({ windowMs: 60_000, limit: 6, standardHeaders: true, legacyHeaders: false, handler: (_q, res) => sendError(res, 429, "rate_limited", "Too many update requests. Try again in a minute.") }),
    asyncHandler(async (req, res) => {
      let run;
      try {
        run = await runs.start({ trigger: "manual", userId: req.auth.userId });
      } catch (err) {
        if (err instanceof RunInProgressError) throw new HttpError(409, "run_in_progress", "An update run is already in progress. Wait for it to finish.");
        throw err;
      }
      try {
        const job = await runner.enqueue("update_run", { run_id: run.id, user_id: req.auth.userId, role: req.auth.role }, req.auth.userId);
        res.status(202).json({ run: publicRun(run), job: publicJob(job) });
      } catch (err) {
        await runs.finish(run.id, { status: "failed", regions_checked: 0, new_acquisitions: 0, captions_created: 0, failed_tasks: 0, summary: { error: "Could not queue the run." } });
        throw err;
      }
    }),
  );

  router.get(
    "/updates/status",
    asyncHandler(async (_req, res) => {
      const [running, latest, lastSuccess] = await Promise.all([runs.running(), runs.latest(), runs.lastSuccess()]);
      res.json({
        running: running ? publicRun(running) : null,
        last_run: latest ? publicRun(latest) : null,
        last_success_at: lastSuccess?.finished_at ?? null,
        schedule: { mode: "manual", note: "Automatic weekly runs are added in a later stage." },
      });
    }),
  );

  router.get(
    "/updates/history",
    asyncHandler(async (req, res) => {
      const q = listSchema.safeParse({ limit: req.query.limit || undefined, cursor: req.query.cursor || undefined });
      if (!q.success) throw new HttpError(400, "validation_error", `${q.error.issues[0].path.join(".") || "request"}: ${q.error.issues[0].message}`);
      const rows = await runs.list({ limit: q.data.limit + 1, after: q.data.cursor ? decodeCursor(q.data.cursor) : null });
      const page = rows.slice(0, q.data.limit);
      res.json({ items: page.map(publicRun), next_cursor: rows.length > q.data.limit ? encodeCursor(page[page.length - 1]) : null });
    }),
  );

  router.get(
    "/updates/runs/:id",
    auth,
    asyncHandler(async (req, res) => {
      if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Run id must be a UUID.");
      const run = await runs.get(req.params.id);
      if (!run || (run.created_by !== req.auth.userId && req.auth.role !== "admin")) throw new HttpError(404, "not_found", "Update run not found.");
      res.json({ run: { ...publicRun(run), summary: run.summary } });
    }),
  );

  return router;
}
