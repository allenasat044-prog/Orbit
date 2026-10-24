const SELECT = `
  select an.id, an.status, an.scl_used, an.results, an.notes, an.overlay_path, an.created_by, an.created_at,
         an.before_chip_id, an.after_chip_id,
         bc.center_lat, bc.center_lon, bc.size_px, ST_AsGeoJSON(bc.bounds)::json as bounds,
         ba.id as before_acquisition_id, ba.external_id as before_scene, ba.acquired_at as before_acquired_at, ba.platform as before_platform, ba.cloud_cover as before_cloud,
         aa.id as after_acquisition_id, aa.external_id as after_scene, aa.acquired_at as after_acquired_at, aa.platform as after_platform, aa.cloud_cover as after_cloud
    from change_analyses an
    join chips bc on bc.id = an.before_chip_id
    join chips ac on ac.id = an.after_chip_id
    join acquisitions ba on ba.id = bc.acquisition_id
    join acquisitions aa on aa.id = ac.acquisition_id`;

export function createAnalysesRepo(pool) {
  const findById = async (id) => (await pool.query(`${SELECT} where an.id = $1`, [id])).rows[0] ?? null;
  const findByChips = async (before, after) => (await pool.query("select id from change_analyses where before_chip_id = $1 and after_chip_id = $2", [before, after])).rows[0] ?? null;
  return {
    findById,
    findByChips,
    async insert(a) {
      const r = await pool.query(
        `insert into change_analyses (before_chip_id, after_chip_id, status, scl_used, results, notes, overlay_path, created_by)
         values ($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8)
         on conflict (before_chip_id, after_chip_id) do nothing returning id`,
        [a.before_chip_id, a.after_chip_id, a.status, a.scl_used, JSON.stringify(a.results), JSON.stringify(a.notes), a.overlay_path ?? null, a.created_by ?? null],
      );
      if (r.rows[0]) return { analysis: await findById(r.rows[0].id), created: true };
      const existing = await findByChips(a.before_chip_id, a.after_chip_id);
      return { analysis: await findById(existing.id), created: false };
    },
  };
}
