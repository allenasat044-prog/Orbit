import crypto from "node:crypto";

export const promptKey = (prompt) => (prompt ? crypto.createHash("sha256").update(prompt).digest("hex").slice(0, 16) : "default");

const COLS = "id, chip_id, acquisition_id, model_id, checkpoint, revision, device, dtype, prompt, prompt_key, caption, latency_ms, created_by, created_at";

export function createCaptionsRepo(pool) {
  const findById = async (id) => (await pool.query(`select ${COLS} from captions where id = $1`, [id])).rows[0] ?? null;
  const find = async (chipId, modelId, key) => (await pool.query(`select ${COLS} from captions where chip_id = $1 and model_id = $2 and prompt_key = $3`, [chipId, modelId, key])).rows[0] ?? null;
  return {
    findById,
    find,
    async listForUser(userId, { limit, after = null }) {
      const r = await pool.query(
        `select c.id, c.chip_id, c.acquisition_id, c.model_id, c.checkpoint, c.revision, c.device, c.dtype, c.prompt, c.prompt_key, c.caption,
                c.latency_ms, c.created_by, c.created_at, c.created_at::text as created_at_raw,
                a.acquired_at, a.platform, a.external_id as scene_id,
                ch.center_lat, ch.center_lon, ch.size_px, ch.gsd_m
           from captions c
           join chips ch on ch.id = c.chip_id
           join acquisitions a on a.id = c.acquisition_id
          where c.created_by = $1
            and ($2::timestamptz is null or (c.created_at, c.id) < ($2::timestamptz, $3::uuid))
          order by c.created_at desc, c.id desc
          limit $4`,
        [userId, after?.t ?? null, after?.id ?? null, limit],
      );
      return r.rows;
    },
    async remove(id) {
      const r = await pool.query("delete from captions where id = $1 returning id", [id]);
      return r.rowCount > 0;
    },
    async insert(c) {
      const r = await pool.query(
        `insert into captions (chip_id, acquisition_id, model_id, checkpoint, revision, device, dtype, prompt, prompt_key, caption, latency_ms, created_by)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
         on conflict (chip_id, model_id, prompt_key) do nothing returning id`,
        [c.chip_id, c.acquisition_id, c.model_id, c.checkpoint, c.revision ?? null, c.device ?? null, c.dtype ?? null, c.prompt, c.prompt_key, c.caption, c.latency_ms ?? null, c.created_by ?? null],
      );
      if (r.rows[0]) return { caption: await findById(r.rows[0].id), created: true };
      return { caption: await find(c.chip_id, c.model_id, c.prompt_key), created: false };
    },
  };
}
