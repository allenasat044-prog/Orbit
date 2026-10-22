const COLS = "id, chip_id, created_by, created_at, results, scene_tags, scene_model, scene_error, unavailable";

export function createComparisonsRepo(pool) {
  const findById = async (id) => (await pool.query(`select ${COLS} from model_comparisons where id = $1`, [id])).rows[0] ?? null;
  return {
    findById,
    async insert(c) {
      const r = await pool.query(
        `insert into model_comparisons (chip_id, created_by, results, scene_tags, scene_model, scene_error, unavailable)
         values ($1, $2, $3::jsonb, $4::jsonb, $5::jsonb, $6::jsonb, $7::jsonb) returning id`,
        [c.chip_id, c.created_by ?? null, JSON.stringify(c.results), JSON.stringify(c.scene_tags ?? null), JSON.stringify(c.scene_model ?? null), JSON.stringify(c.scene_error ?? null), JSON.stringify(c.unavailable ?? [])],
      );
      return findById(r.rows[0].id);
    },
  };
}
