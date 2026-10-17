import pg from "pg";

export function createPool(connectionString, useSsl = false) {
  const pool = new pg.Pool({
    connectionString,
    max: 10,
    connectionTimeoutMillis: 5000,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });
  pool.on("error", (err) => console.error("postgres pool error:", err.message));
  return pool;
}

export async function checkDb(pool) {
  const r = await pool.query("select postgis_version() as postgis, version() as postgres");
  return { postgis: r.rows[0].postgis, postgres: r.rows[0].postgres.split(" ").slice(0, 2).join(" ") };
}
