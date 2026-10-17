import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "migrations");

export async function runMigrations(pool, migrationsDir = dir) {
  await pool.query(
    "create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())",
  );
  const applied = new Set((await pool.query("select name from schema_migrations")).rows.map((r) => r.name));
  const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();
  const ran = [];
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    const client = await pool.connect();
    try {
      await client.query("begin");
      await client.query(sql);
      await client.query("insert into schema_migrations (name) values ($1)", [file]);
      await client.query("commit");
      ran.push(file);
    } catch (err) {
      await client.query("rollback");
      throw new Error(`Migration ${file} failed: ${err.message}`);
    } finally {
      client.release();
    }
  }
  return ran;
}
