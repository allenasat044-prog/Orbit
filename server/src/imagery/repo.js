const COLUMNS = `id, provider_id, collection, external_id, acquired_at, platform, constellation, instruments,
  processing_level, product_type, grid_code, cloud_cover, gsd, ST_AsGeoJSON(footprint)::json as footprint,
  stac_url, visual_asset_key, assets, properties, attribution, ingested_by, ingested_at`;

export function createAcquisitionsRepo(pool) {
  async function findById(id) {
    const r = await pool.query(`select ${COLUMNS} from acquisitions where id = $1`, [id]);
    return r.rows[0] ?? null;
  }

  async function findByExternal(providerId, externalId) {
    const r = await pool.query(`select ${COLUMNS} from acquisitions where provider_id = $1 and external_id = $2`, [providerId, externalId]);
    return r.rows[0] ?? null;
  }

  return {
    findById,
    findByExternal,

    async findExistingIds(providerId, externalIds) {
      if (!externalIds.length) return new Map();
      const r = await pool.query("select external_id, id from acquisitions where provider_id = $1 and external_id = any($2::text[])", [providerId, externalIds]);
      return new Map(r.rows.map((row) => [row.external_id, row.id]));
    },

    async upsert(rec, userId = null) {
      const ins = await pool.query(
        `insert into acquisitions
          (provider_id, collection, external_id, acquired_at, platform, constellation, instruments, processing_level,
           product_type, grid_code, cloud_cover, gsd, footprint, stac_url, visual_asset_key, assets, properties, attribution, ingested_by)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12, ST_SetSRID(ST_GeomFromGeoJSON($13), 4326), $14,$15,$16::jsonb,$17::jsonb,$18,$19)
         on conflict (provider_id, external_id) do nothing
         returning id`,
        [
          rec.provider_id, rec.collection, rec.external_id, rec.acquired_at, rec.platform, rec.constellation, rec.instruments,
          rec.processing_level, rec.product_type, rec.grid_code, rec.cloud_cover, rec.gsd, JSON.stringify(rec.footprint),
          rec.stac_url, rec.visual_asset_key, JSON.stringify(rec.assets), JSON.stringify(rec.properties), rec.attribution, userId,
        ],
      );
      if (ins.rows[0]) return { record: await findById(ins.rows[0].id), created: true };
      return { record: await findByExternal(rec.provider_id, rec.external_id), created: false };
    },
  };
}
