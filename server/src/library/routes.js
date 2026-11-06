import express from "express";
import { z } from "zod";
import { HttpError, asyncHandler } from "../errors.js";
import { requireAuth } from "../auth/middleware.js";
import { ConflictError } from "./repo.js";
import { chipImageUrl } from "../imagery/chipUrls.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const LIMITS = { bookmarks: 500, labels: 50, lists: 30 };

const color = z.string().regex(/^#[0-9a-fA-F]{6}$/, "color must look like #8daaff");
const optText = (max) => z.string().trim().max(max);
const httpsUrl = z.string().trim().max(200).refine((v) => v === "" || /^https?:\/\/[^\s]+$/i.test(v), "website must start with http:// or https://");

const IMAGE_URL = /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/;
const image = (max) => z.string().max(max, "image is too large").refine((v) => IMAGE_URL.test(v), "image must be a JPEG, PNG or WebP").nullable();

export const IMAGE_LIMITS = { avatar: 150_000, cover: 450_000 };

const profileSchema = z.object({
  username: z.string().trim().toLowerCase().regex(/^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/, "username: 3-30 letters, numbers or hyphens, not starting or ending with a hyphen").optional(),
  first_name: z.string().trim().min(1, "enter your first name").max(50).optional(),
  last_name: optText(50).optional(),
  bio: optText(300).optional(),
  location: optText(80).optional(),
  website: httpsUrl.optional(),
  avatar_image: image(IMAGE_LIMITS.avatar).optional(),
  cover_image: image(IMAGE_LIMITS.cover).optional(),
}).strict();

const labelCreate = z.object({ name: z.string().trim().min(1, "name is required").max(40), color: color.default("#8daaff") }).strict();
const labelPatch = z.object({ name: z.string().trim().min(1).max(40).optional(), color: color.optional() }).strict();
const listCreate = z.object({ name: z.string().trim().min(1, "name is required").max(60), description: optText(300).default("") }).strict();
const listPatch = z.object({ name: z.string().trim().min(1).max(60).optional(), description: optText(300).optional() }).strict();

const uuid = z.string().regex(UUID, "must be a UUID");
const bookmarkCreate = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  note: z.string().max(2000).default(""),
  lat: z.number().min(-90).max(90).nullable().optional(),
  lon: z.number().min(-180).max(180).nullable().optional(),
  caption_id: uuid.nullable().optional(),
  list_id: uuid.nullable().optional(),
  label_ids: z.array(uuid).max(10).default([]),
}).strict();
const bookmarkPatch = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  note: z.string().max(2000).optional(),
  lat: z.number().min(-90).max(90).nullable().optional(),
  lon: z.number().min(-180).max(180).nullable().optional(),
  list_id: uuid.nullable().optional(),
  caption_id: uuid.optional(),
  label_ids: z.array(uuid).max(10).optional(),
}).strict();

const check = (schema, body) => {
  const r = schema.safeParse(body ?? {});
  if (!r.success) throw new HttpError(400, "validation_error", `${r.error.issues[0].path.join(".") || "request"}: ${r.error.issues[0].message}`);
  return r.data;
};

export const publicBookmark = (b) => ({
  id: b.id,
  title: b.title,
  note: b.note,
  location: b.lat != null && b.lon != null ? { lat: b.lat, lon: b.lon } : null,
  caption: b.caption_id ? { id: b.caption_id, text: b.caption_text, image_url: b.chip_id ? chipImageUrl(b.chip_id) : null } : null,
  list_id: b.list_id,
  labels: b.labels ?? [],
  created_at: b.created_at,
});

const publicProfile = (p, user) => ({
  username: p.username,
  first_name: p.first_name,
  last_name: p.last_name,
  bio: p.bio,
  location: p.location ?? "",
  website: p.website ?? "",
  avatar_image: p.avatar_image,
  cover_image: p.cover_image,
  email: user.email,
  joined_at: user.created_at,
  updated_at: p.updated_at,
});

export function createLibraryRouter({ config, library, users }) {
  const router = express.Router();
  const auth = requireAuth(config);
  const wrap = (err) => (err instanceof ConflictError ? new HttpError(409, "conflict", err.message) : err);
  const guard = (fn) => asyncHandler(async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      throw wrap(err);
    }
  });
  const ownedId = (req) => {
    if (!UUID.test(req.params.id)) throw new HttpError(400, "invalid_id", "Id must be a UUID.");
    return req.params.id;
  };

  // ---- profile ----
  const currentUser = async (req) => {
    const user = await users.findById(req.auth.userId);
    if (!user) throw new HttpError(401, "unauthorized", "Account no longer exists");
    return user;
  };

  router.get("/library/profile", auth, guard(async (req, res) => {
    const user = await currentUser(req);
    res.json({ profile: publicProfile(await library.ensureProfile(user), user) });
  }));

  router.put("/library/profile", auth, guard(async (req, res) => {
    const patch = check(profileSchema, req.body);
    const user = await currentUser(req);
    await library.ensureProfile(user);
    try {
      res.json({ profile: publicProfile(await library.updateProfile(req.auth.userId, patch), user) });
    } catch (err) {
      if (err instanceof ConflictError) throw new HttpError(409, "username_taken", "That username is already taken.");
      throw err;
    }
  }));

  // ---- labels ----
  router.get("/library/labels", auth, guard(async (req, res) => {
    res.json({ items: await library.listLabels(req.auth.userId) });
  }));
  router.post("/library/labels", auth, guard(async (req, res) => {
    const body = check(labelCreate, req.body);
    if ((await library.countLabels(req.auth.userId)) >= LIMITS.labels) throw new HttpError(422, "label_limit", `You can have up to ${LIMITS.labels} labels.`);
    res.status(201).json({ label: await library.createLabel(req.auth.userId, body) });
  }));
  const ownedLabel = async (req) => {
    const row = await library.findLabel(ownedId(req));
    if (!row || row.user_id !== req.auth.userId) throw new HttpError(404, "not_found", "Label not found.");
    return row;
  };
  router.patch("/library/labels/:id", auth, guard(async (req, res) => {
    const row = await ownedLabel(req);
    res.json({ label: await library.updateLabel(row.id, check(labelPatch, req.body)) });
  }));
  router.delete("/library/labels/:id", auth, guard(async (req, res) => {
    const row = await ownedLabel(req);
    await library.removeLabel(row.id);
    res.status(204).end();
  }));

  // ---- lists ----
  router.get("/library/lists", auth, guard(async (req, res) => {
    res.json({ items: await library.listLists(req.auth.userId) });
  }));
  router.post("/library/lists", auth, guard(async (req, res) => {
    const body = check(listCreate, req.body);
    if ((await library.countLists(req.auth.userId)) >= LIMITS.lists) throw new HttpError(422, "list_limit", `You can have up to ${LIMITS.lists} lists.`);
    res.status(201).json({ list: await library.createList(req.auth.userId, body) });
  }));
  const ownedList = async (req) => {
    const row = await library.findList(ownedId(req));
    if (!row || row.user_id !== req.auth.userId) throw new HttpError(404, "not_found", "List not found.");
    return row;
  };
  router.patch("/library/lists/:id", auth, guard(async (req, res) => {
    const row = await ownedList(req);
    res.json({ list: await library.updateList(row.id, check(listPatch, req.body)) });
  }));
  router.delete("/library/lists/:id", auth, guard(async (req, res) => {
    const row = await ownedList(req);
    await library.removeList(row.id);
    res.status(204).end();
  }));

  // ---- bookmarks ----
  const verifyRefs = async (userId, { list_id, label_ids }) => {
    if (list_id && !(await library.ownedListId(userId, list_id))) throw new HttpError(404, "not_found", "List not found.");
    if (label_ids?.length) {
      const unique = [...new Set(label_ids)];
      const owned = await library.ownedLabelIds(userId, unique);
      if (owned.length !== unique.length) throw new HttpError(404, "not_found", "One of the labels was not found.");
      return unique;
    }
    return label_ids ?? [];
  };

  router.get("/library/bookmarks", auth, guard(async (req, res) => {
    const f = check(z.object({
      list_id: uuid.optional(), label_id: uuid.optional(),
      q: z.string().trim().max(100).optional(), unlisted: z.enum(["1", "true"]).optional(),
    }), Object.fromEntries(Object.entries({ list_id: req.query.list_id, label_id: req.query.label_id, q: req.query.q, unlisted: req.query.unlisted }).filter(([, v]) => v)));
    const rows = await library.listBookmarks(req.auth.userId, { listId: f.list_id ?? null, labelId: f.label_id ?? null, search: f.q || null, unlisted: Boolean(f.unlisted) });
    res.json({ items: rows.map(publicBookmark) });
  }));

  router.post("/library/bookmarks", auth, guard(async (req, res) => {
    const body = check(bookmarkCreate, req.body);
    const userId = req.auth.userId;
    if ((await library.countBookmarks(userId)) >= LIMITS.bookmarks) throw new HttpError(422, "bookmark_limit", `You can keep up to ${LIMITS.bookmarks} bookmarks.`);
    const label_ids = await verifyRefs(userId, body);
    let { title, lat = null, lon = null } = body;
    if (body.caption_id) {
      const cap = await library.captionForUser(userId, body.caption_id);
      if (!cap) throw new HttpError(404, "not_found", "Caption not found.");
      title ??= cap.caption.slice(0, 80);
      if (lat == null || lon == null) { lat = cap.lat; lon = cap.lon; }
    }
    if ((lat == null) !== (lon == null)) throw new HttpError(400, "validation_error", "lat and lon must be given together.");
    if (!title) throw new HttpError(400, "validation_error", "title: title is required");
    // One bookmark per place: point the caller at the one that is already there.
    const dup = (body.caption_id && (await library.findBookmarkByCaption(userId, body.caption_id))) || (lat != null && (await library.findNearbyBookmark(userId, lat, lon)));
    if (dup) return duplicate(res, dup);
    const row = await library.createBookmark(userId, { title, note: body.note, lat, lon, caption_id: body.caption_id ?? null, list_id: body.list_id ?? null, label_ids });
    res.status(201).json({ bookmark: publicBookmark(row) });
  }));

  const duplicate = (res, existing) =>
    res.status(409).json({
      error: { code: "duplicate_location", message: "You already have a bookmark at this place. Edit that one instead." },
      bookmark: publicBookmark(existing),
    });

  router.get("/library/bookmarks/nearby", auth, guard(async (req, res) => {
    const q = check(z.object({ lat: z.coerce.number().min(-90).max(90), lon: z.coerce.number().min(-180).max(180) }), req.query);
    const found = await library.findNearbyBookmark(req.auth.userId, q.lat, q.lon);
    res.json({ bookmark: found ? publicBookmark(found) : null });
  }));

  router.post("/library/bookmarks/merge-duplicates", auth, guard(async (req, res) => {
    res.json(await library.mergeDuplicates(req.auth.userId));
  }));

  const ownedBookmark = async (req) => {
    const row = await library.findBookmark(ownedId(req));
    if (!row || row.user_id !== req.auth.userId) throw new HttpError(404, "not_found", "Bookmark not found.");
    return row;
  };

  router.patch("/library/bookmarks/:id", auth, guard(async (req, res) => {
    const row = await ownedBookmark(req);
    const patch = check(bookmarkPatch, req.body);
    if (patch.label_ids) patch.label_ids = await verifyRefs(req.auth.userId, { label_ids: patch.label_ids });
    if (patch.list_id) await verifyRefs(req.auth.userId, { list_id: patch.list_id });
    if ((patch.lat === undefined) !== (patch.lon === undefined)) throw new HttpError(400, "validation_error", "lat and lon must be changed together.");
    if ((patch.lat === null) !== (patch.lon === null)) throw new HttpError(400, "validation_error", "lat and lon must both be null or both set.");
    if (patch.caption_id) {
      // Adds a caption to a bookmark that has none; a bookmark that already has one keeps it.
      if (row.caption_id) delete patch.caption_id;
      else {
        if (!(await library.captionForUser(req.auth.userId, patch.caption_id))) throw new HttpError(404, "not_found", "Caption not found.");
        const taken = await library.findBookmarkByCaption(req.auth.userId, patch.caption_id, row.id);
        if (taken) return duplicate(res, taken);
      }
    }
    if (patch.lat != null) {
      const clash = await library.findNearbyBookmark(req.auth.userId, patch.lat, patch.lon, row.id);
      if (clash) return duplicate(res, clash);
    }
    res.json({ bookmark: publicBookmark(await library.updateBookmark(row.id, patch)) });
  }));

  router.delete("/library/bookmarks/:id", auth, guard(async (req, res) => {
    const row = await ownedBookmark(req);
    await library.removeBookmark(row.id);
    res.status(204).end();
  }));

  // ---- records ----
  router.get("/library/records", auth, guard(async (req, res) => {
    res.json(await library.records(req.auth.userId));
  }));

  return router;
}
