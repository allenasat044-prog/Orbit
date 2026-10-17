import { config } from "./config.js";
import { createPool } from "./db.js";
import { runMigrations } from "./migrate.js";

const pool = createPool(config.databaseUrl, config.databaseSsl);

try {
  const ran = await runMigrations(pool);
  console.log(ran.length ? `Applied: ${ran.join(", ")}` : "No new migrations");
} catch (err) {
  console.error(`Migration failed: ${err.message || err.code || err}`);
  process.exitCode = 1;
} finally {
  await pool.end();
}
