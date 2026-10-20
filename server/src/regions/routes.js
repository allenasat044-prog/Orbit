import express from "express";
import { z } from "zod";
import { HttpError, asyncHandler } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { COLLECTIONS } from "../providers/copernicus.js";
import { RegionExistsError } from "./repo.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const MAX_REGIONS_PER_USER = 20;

const createSchema = z.object({
  name: z.string({ required_error: "name is required" }).trim().min(1, "name is required").max(80),
  lat: z.number({ required_error: "lat is required" }).min(-90).max(90),
  lon: z.number({ required_error: "lon is required" }).min(-180).max(180),
  collection: z.enum(COLLECTIONS).default("sentinel-2-l2a"),
  max_cloud: z.number().min(0).max(100).default(30),
  auto_caption: z.boolean().default(false),
});

const patchSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  max_cloud: z.number().min(0).max(100).optional(),
  auto_caption: z.boolean().optional(),
  active: z.boolean().optional(),
}).strict();

export const publicRegion = (r) => ({
  id: r.id,
  name: r.name,
  location: { lat: r.lat, lon: r.lon },
  collection: r.collection,
  max_cloud: r.max_cloud,
  auto_caption: r.auto_caption,
  active: r.active,
  created_at: r.created_at,
  last_checked_at: r.last_checked_at,
  last_success_at: r.last_success_at,
});

const check = (schema, body) => {
  const r = schema.safeParse(body ?? {});
  if (!r.success) throw new HttpError(400, "validation_error", `${r.error.issues[0].path.join(".") || "request"}: ${r.error.issues[0].message}`);
  return r.data;
};

export function createRegionRouter({ config, regions }) {
  const router = express.Router();
  const auth = requireAuth(config);
  const owned = async (req) => {
    if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Region id must be a UUID.");
    const row = await regions.findById(req.params.id);
    if (!row || (row.created_by !== req.auth.userId && req.auth.role !== "admin")) throw new HttpError(404, "not_found", "Monitored location not found.");
    return row;
  };
  const wrapExists = (err) => (err instanceof RegionExistsError ? new HttpError(409, "region_exists", err.message) : err);

  router.get("/regions", auth, asyncHandler(async (req, res) => {
    res.json({ items: (await regions.listForUser(req.auth.userId)).map(publicRegion) });
  }));

  router.post("/regions", auth, asyncHandler(async (req, res) => {
    const body = check(createSchema, req.body);
    if ((await regions.countForUser(req.auth.userId)) >= MAX_REGIONS_PER_USER) {
      throw new HttpError(422, "region_limit", `You can monitor up to ${MAX_REGIONS_PER_USER} locations. Delete one first.`);
    }
    try {
      res.status(201).json({ region: publicRegion(await regions.create({ ...body, created_by: req.auth.userId })) });
    } catch (err) {
      throw wrapExists(err);
    }
  }));

  router.patch("/regions/:id", auth, asyncHandler(async (req, res) => {
    const row = await owned(req);
    const patch = check(patchSchema, req.body);
    try {
      res.json({ region: publicRegion(await regions.update(row.id, patch)) });
    } catch (err) {
      throw wrapExists(err);
    }
  }));

  router.delete("/regions/:id", auth, asyncHandler(async (req, res) => {
    const row = await owned(req);
    await regions.remove(row.id);
    res.status(204).end();
  }));

  return router;
}
