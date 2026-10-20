export class RegionExistsError extends Error {
  constructor() {
    super("A monitored location with this name already exists.");
    this.name = "RegionExistsError";
  }
}

const COLS = `id, name, ST_Y(center) as lat, ST_X(center) as lon, collection, max_cloud, auto_caption, active, created_by, created_at, last_checked_at, last_success_at`;

export function createRegionsRepo(pool) {
  const findById = async (id) => (await pool.query(`select ${COLS} from regions where id = $1`, [id])).rows[0] ?? null;
  return {
    findById,
    async create(r) {
      try {
        const q = await pool.query(
          `insert into regions (name, center, collection, max_cloud, auto_caption, created_by)
           values ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326), $4, $5, $6, $7) returning id`,
          [r.name, r.lon, r.lat, r.collection, r.max_cloud, r.auto_caption, r.created_by],
        );
        return findById(q.rows[0].id);
      } catch (err) {
        if (err.code === "23505") throw new RegionExistsError();
        throw err;
      }
    },
    async listForUser(userId) {
      return (await pool.query(`select ${COLS} from regions where created_by = $1 order by created_at desc`, [userId])).rows;
    },
    async countForUser(userId) {
      return Number((await pool.query("select count(*) from regions where created_by = $1", [userId])).rows[0].count);
    },
    async listActive(userId = null) {
      return (await pool.query(`select ${COLS} from regions where active and ($1::uuid is null or created_by = $1) order by created_at`, [userId])).rows;
    },
    async update(id, patch) {
      const sets = [];
      const vals = [id];
      for (const [k, v] of Object.entries(patch)) {
        vals.push(v);
        sets.push(`${k} = $${vals.length}`);
      }
      if (!sets.length) return findById(id);
      try {
        await pool.query(`update regions set ${sets.join(", ")} where id = $1`, vals);
      } catch (err) {
        if (err.code === "23505") throw new RegionExistsError();
        throw err;
      }
      return findById(id);
    },
    async remove(id) {
      return (await pool.query("delete from regions where id = $1", [id])).rowCount > 0;
    },
    async markChecked(id, { at, success }) {
      await pool.query("update regions set last_checked_at = $2, last_success_at = case when $3 then $2 else last_success_at end where id = $1", [id, at, success]);
    },
  };
}
