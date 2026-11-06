export function createAssetsRepo(pool) {
  return {
    async find(acquisitionId, assetKey) {
      return (await pool.query("select * from imagery_assets where acquisition_id = $1 and asset_key = $2", [acquisitionId, assetKey])).rows[0] ?? null;
    },
    async insert(a) {
      const r = await pool.query(
        `insert into imagery_assets (acquisition_id, asset_key, storage_path, sha256, size_bytes, content_type)
         values ($1,$2,$3,$4,$5,$6)
         on conflict (acquisition_id, asset_key) do update set storage_path = excluded.storage_path, sha256 = excluded.sha256,
           size_bytes = excluded.size_bytes, content_type = excluded.content_type
         returning *`,
        [a.acquisition_id, a.asset_key, a.storage_path, a.sha256, a.size_bytes, a.content_type ?? null],
      );
      return r.rows[0];
    },
  };
}

const CHIP_COLS = `id, acquisition_id, asset_id, center_key, center_lon, center_lat, size_px, width_px, height_px, pin_x, pin_y,
  gsd_m, crs, nodata_fraction, ST_AsGeoJSON(bounds)::json as bounds, storage_path, sha256, created_at`;

export function createChipsRepo(pool) {
  const findById = async (id) => (await pool.query(`select ${CHIP_COLS} from chips where id = $1`, [id])).rows[0] ?? null;
  const findByKey = async (acqId, key) => (await pool.query(`select ${CHIP_COLS} from chips where acquisition_id = $1 and center_key = $2`, [acqId, key])).rows[0] ?? null;
  return {
    findById,
    findByKey,
    // Rebuild a chip's picture in place: same record and files, so captions and bookmarks stay attached.
    async update(id, c) {
      await pool.query(
        `update chips set asset_id = $2, width_px = $3, height_px = $4, pin_x = $5, pin_y = $6, gsd_m = $7, crs = $8,
           nodata_fraction = $9, bounds = ST_SetSRID(ST_GeomFromGeoJSON($10),4326), sha256 = $11 where id = $1`,
        [id, c.asset_id, c.width_px, c.height_px, c.pin_x, c.pin_y, c.gsd_m, c.crs, c.nodata_fraction, JSON.stringify(c.bounds), c.sha256],
      );
      return findById(id);
    },
    async insert(c) {
      const r = await pool.query(
        `insert into chips (id, acquisition_id, asset_id, center_key, center_lon, center_lat, size_px, width_px, height_px, pin_x, pin_y,
           gsd_m, crs, nodata_fraction, bounds, storage_path, sha256)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, ST_SetSRID(ST_GeomFromGeoJSON($15),4326), $16,$17)
         on conflict (acquisition_id, center_key) do nothing returning id`,
        [c.id, c.acquisition_id, c.asset_id, c.center_key, c.center_lon, c.center_lat, c.size_px, c.width_px, c.height_px, c.pin_x, c.pin_y,
         c.gsd_m, c.crs, c.nodata_fraction, JSON.stringify(c.bounds), c.storage_path, c.sha256],
      );
      if (r.rows[0]) return { chip: await findById(r.rows[0].id), created: true };
      return { chip: await findByKey(c.acquisition_id, c.center_key), created: false };
    },
  };
}
