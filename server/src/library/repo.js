import { NEAR_DEGREES, planMerges } from "./places.js";

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
  }
}

const PROFILE_COLS = "user_id, username, first_name, last_name, bio, location, website, avatar_image, cover_image, updated_at";

export const slugify = (s) => {
  const base = String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30).replace(/-+$/g, "");
  return base.length >= 3 ? base : `${base || "user"}-${Math.random().toString(36).slice(2, 6)}`.slice(0, 30);
};

const unique = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (err) {
    if (err.code === "23505") throw new ConflictError("That name is already in use.");
    throw err;
  }
};

export function createLibraryRepo(pool) {
  const q = (sql, params) => pool.query(sql, params);

  const getProfile = async (userId) => (await q(`select ${PROFILE_COLS} from profiles where user_id = $1`, [userId])).rows[0] ?? null;

  const bookmarkSelect = `
    select b.id, b.user_id, b.title, b.note, b.lat, b.lon, b.caption_id, b.list_id, b.created_at,
           c.caption as caption_text, c.chip_id,
           coalesce(json_agg(json_build_object('id', l.id, 'name', l.name, 'color', l.color) order by l.name)
                    filter (where l.id is not null), '[]'::json) as labels
      from bookmarks b
      left join captions c on c.id = b.caption_id
      left join bookmark_labels bl on bl.bookmark_id = b.id
      left join labels l on l.id = bl.label_id`;
  const bookmarkGroup = "group by b.id, c.caption, c.chip_id";

  const findBookmark = async (id) => (await q(`${bookmarkSelect} where b.id = $1 ${bookmarkGroup}`, [id])).rows[0] ?? null;

  const setBookmarkLabels = async (bookmarkId, labelIds) => {
    await q("delete from bookmark_labels where bookmark_id = $1", [bookmarkId]);
    if (labelIds.length) {
      await q("insert into bookmark_labels (bookmark_id, label_id) select $1, unnest($2::uuid[]) on conflict do nothing", [bookmarkId, labelIds]);
    }
  };

  return {
    // ---- profile ----
    getProfile,
    async ensureProfile(user) {
      const existing = await getProfile(user.id);
      if (existing) return existing;
      const [first = "", ...rest] = String(user.name ?? "").trim().split(/\s+/);
      const last = rest.join(" ");
      const base = slugify(user.name);
      for (let i = 0; i < 25; i++) {
        const candidate = i === 0 ? base : `${base.slice(0, 26)}-${i + 1}`;
        const r = await q(
          `insert into profiles (user_id, username, first_name, last_name) values ($1, $2, $3, $4)
           on conflict do nothing returning ${PROFILE_COLS}`,
          [user.id, candidate, first.slice(0, 50), last.slice(0, 50)],
        );
        if (r.rows[0]) return r.rows[0];
        const again = await getProfile(user.id);
        if (again) return again;
      }
      const r = await q(
        `insert into profiles (user_id, username, first_name, last_name) values ($1, $2, $3, $4) returning ${PROFILE_COLS}`,
        [user.id, `user-${user.id.slice(0, 8)}`, first.slice(0, 50), last.slice(0, 50)],
      );
      return r.rows[0];
    },
    updateProfile: unique(async (userId, p) => {
      const cols = ["username", "first_name", "last_name", "bio", "location", "website", "avatar_image", "cover_image"].filter((k) => p[k] !== undefined);
      if (!cols.length) return getProfile(userId);
      const sets = cols.map((c, i) => `${c} = $${i + 2}`);
      const r = await q(
        `update profiles set ${sets.join(", ")}, updated_at = now() where user_id = $1 returning ${PROFILE_COLS}`,
        [userId, ...cols.map((c) => p[c])],
      );
      return r.rows[0] ?? null;
    }),

    // ---- labels ----
    async listLabels(userId) {
      return (await q(
        `select l.id, l.name, l.color, l.created_at, count(bl.bookmark_id)::int as bookmark_count
           from labels l left join bookmark_labels bl on bl.label_id = l.id
          where l.user_id = $1 group by l.id order by lower(l.name)`,
        [userId],
      )).rows;
    },
    async countLabels(userId) {
      return Number((await q("select count(*) from labels where user_id = $1", [userId])).rows[0].count);
    },
    async findLabel(id) {
      return (await q("select id, user_id, name, color, created_at from labels where id = $1", [id])).rows[0] ?? null;
    },
    createLabel: unique(async (userId, { name, color }) =>
      (await q("insert into labels (user_id, name, color) values ($1,$2,$3) returning id, name, color, created_at", [userId, name, color])).rows[0]),
    updateLabel: unique(async (id, patch) => {
      const cols = ["name", "color"].filter((k) => patch[k] !== undefined);
      if (!cols.length) return (await q("select id, name, color, created_at from labels where id = $1", [id])).rows[0];
      return (await q(`update labels set ${cols.map((c, i) => `${c} = $${i + 2}`).join(", ")} where id = $1 returning id, name, color, created_at`, [id, ...cols.map((c) => patch[c])])).rows[0];
    }),
    async removeLabel(id) {
      return (await q("delete from labels where id = $1", [id])).rowCount > 0;
    },
    async ownedLabelIds(userId, ids) {
      if (!ids.length) return [];
      return (await q("select id from labels where user_id = $1 and id = any($2::uuid[])", [userId, ids])).rows.map((r) => r.id);
    },

    // ---- lists ----
    async listLists(userId) {
      return (await q(
        `select s.id, s.name, s.description, s.created_at, count(b.id)::int as bookmark_count
           from lists s left join bookmarks b on b.list_id = s.id
          where s.user_id = $1 group by s.id order by lower(s.name)`,
        [userId],
      )).rows;
    },
    async countLists(userId) {
      return Number((await q("select count(*) from lists where user_id = $1", [userId])).rows[0].count);
    },
    async findList(id) {
      return (await q("select id, user_id, name, description, created_at from lists where id = $1", [id])).rows[0] ?? null;
    },
    createList: unique(async (userId, { name, description }) =>
      (await q("insert into lists (user_id, name, description) values ($1,$2,$3) returning id, name, description, created_at", [userId, name, description])).rows[0]),
    updateList: unique(async (id, patch) => {
      const cols = ["name", "description"].filter((k) => patch[k] !== undefined);
      if (!cols.length) return (await q("select id, name, description, created_at from lists where id = $1", [id])).rows[0];
      return (await q(`update lists set ${cols.map((c, i) => `${c} = $${i + 2}`).join(", ")} where id = $1 returning id, name, description, created_at`, [id, ...cols.map((c) => patch[c])])).rows[0];
    }),
    async removeList(id) {
      return (await q("delete from lists where id = $1", [id])).rowCount > 0;
    },

    // ---- bookmarks ----
    async listBookmarks(userId, { listId = null, labelId = null, search = null, unlisted = false } = {}) {
      const where = ["b.user_id = $1"];
      const params = [userId];
      if (listId) { params.push(listId); where.push(`b.list_id = $${params.length}`); }
      if (unlisted) where.push("b.list_id is null");
      if (labelId) { params.push(labelId); where.push(`exists (select 1 from bookmark_labels x where x.bookmark_id = b.id and x.label_id = $${params.length})`); }
      if (search) {
        params.push(`%${search.replace(/[%_\\]/g, (m) => `\\${m}`)}%`);
        where.push(`(b.title ilike $${params.length} or b.note ilike $${params.length})`);
      }
      return (await q(`${bookmarkSelect} where ${where.join(" and ")} ${bookmarkGroup} order by b.created_at desc limit 500`, params)).rows;
    },
    async countBookmarks(userId) {
      return Number((await q("select count(*) from bookmarks where user_id = $1", [userId])).rows[0].count);
    },
    findBookmark,
    async captionForUser(userId, captionId) {
      return (await q(
        `select c.id, c.caption, ch.center_lat as lat, ch.center_lon as lon
           from captions c join chips ch on ch.id = c.chip_id
          where c.id = $1 and c.created_by = $2`,
        [captionId, userId],
      )).rows[0] ?? null;
    },
    // A bookmark of mine at (about) this place, if any. excludeId lets an edit ignore itself.
    async findNearbyBookmark(userId, lat, lon, excludeId = null) {
      const row = (await q(
        `${bookmarkSelect}
          where b.user_id = $1 and b.lat is not null
            and abs(b.lat - $2) <= ${NEAR_DEGREES}
            and abs(b.lon - $3) <= ${NEAR_DEGREES} / greatest(cos(radians($2)), 0.01)
            and ($4::uuid is null or b.id <> $4::uuid)
          ${bookmarkGroup} order by b.created_at asc limit 1`,
        [userId, lat, lon, excludeId],
      )).rows[0];
      return row ?? null;
    },
    async findBookmarkByCaption(userId, captionId, excludeId = null) {
      return (await q(
        `${bookmarkSelect} where b.user_id = $1 and b.caption_id = $2 and ($3::uuid is null or b.id <> $3::uuid) ${bookmarkGroup}`,
        [userId, captionId, excludeId],
      )).rows[0] ?? null;
    },
    // Merge bookmarks that sit at the same place (see places.js). Returns how many were removed.
    async mergeDuplicates(userId) {
      const rows = (await q(
        "select id, lat, lon, caption_id, list_id, note, created_at from bookmarks where user_id = $1 and lat is not null order by created_at, id",
        [userId],
      )).rows;
      const plans = planMerges(rows);
      let removed = 0;
      for (const plan of plans) {
        // labels move to the keeper, duplicates go first (a caption can belong to only one bookmark), then the keeper is filled in
        await q(
          `insert into bookmark_labels (bookmark_id, label_id)
             select $1, label_id from bookmark_labels where bookmark_id = any($2::uuid[]) on conflict do nothing`,
          [plan.keeper_id, plan.remove_ids],
        );
        await q("delete from bookmarks where user_id = $1 and id = any($2::uuid[])", [userId, plan.remove_ids]);
        const cols = Object.keys(plan.patch);
        if (cols.length) {
          await q(`update bookmarks set ${cols.map((c, i) => `${c} = $${i + 2}`).join(", ")} where id = $1`, [plan.keeper_id, ...cols.map((c) => plan.patch[c])]);
        }
        removed += plan.remove_ids.length;
      }
      return { removed, places: plans.length };
    },
    async createBookmark(userId, b) {
      let id;
      try {
        id = (await q(
          `insert into bookmarks (user_id, title, note, lat, lon, caption_id, list_id) values ($1,$2,$3,$4,$5,$6,$7) returning id`,
          [userId, b.title, b.note, b.lat, b.lon, b.caption_id, b.list_id],
        )).rows[0].id;
      } catch (err) {
        if (err.code === "23505") throw new ConflictError("You already bookmarked this caption.");
        throw err;
      }
      await setBookmarkLabels(id, b.label_ids);
      return findBookmark(id);
    },
    async updateBookmark(id, patch) {
      const cols = ["title", "note", "lat", "lon", "list_id", "caption_id"].filter((k) => patch[k] !== undefined);
      if (cols.length) {
        await q(`update bookmarks set ${cols.map((c, i) => `${c} = $${i + 2}`).join(", ")} where id = $1`, [id, ...cols.map((c) => patch[c])]);
      }
      if (patch.label_ids !== undefined) await setBookmarkLabels(id, patch.label_ids);
      return findBookmark(id);
    },
    async removeBookmark(id) {
      return (await q("delete from bookmarks where id = $1", [id])).rowCount > 0;
    },
    async ownedListId(userId, id) {
      return (await q("select id from lists where id = $1 and user_id = $2", [id, userId])).rows[0]?.id ?? null;
    },

    // ---- records (profile data) ----
    async records(userId) {
      const counts = (await q(
        `select
           (select count(*) from captions where created_by = $1)::int as captions,
           (select count(*) from regions where created_by = $1)::int as monitored_locations,
           (select count(*) from update_runs where created_by = $1)::int as update_runs,
           (select count(*) from bookmarks where user_id = $1)::int as bookmarks,
           (select count(*) from lists where user_id = $1)::int as lists,
           (select count(*) from labels where user_id = $1)::int as labels`,
        [userId],
      )).rows[0];
      const recent = (await q(
        `select * from (
           select 'caption' as kind, c.id, left(c.caption, 140) as title, c.created_at as at from captions c where c.created_by = $1
           union all
           select 'monitored_location', r.id, r.name, r.created_at from regions r where r.created_by = $1
           union all
           select 'update_run', u.id, u.status || ': ' || u.new_acquisitions || ' new scene(s)', u.started_at from update_runs u where u.created_by = $1
           union all
           select 'bookmark', b.id, b.title, b.created_at from bookmarks b where b.user_id = $1
         ) t order by at desc limit 30`,
        [userId],
      )).rows;
      return { counts, recent };
    },
  };
}
