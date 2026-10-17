import { config } from "./config.js";
import { createPool, checkDb } from "./db.js";
import { checkMl } from "./mlClient.js";
import { createProviders } from "./providers/index.js";
import { createApp } from "./app.js";
import { createUsersRepo } from "./auth/usersRepo.js";

if (config.jwtSecret.length < 32) {
  console.error("JWT_SECRET is missing or shorter than 32 characters. Set it in server/.env");
  process.exit(1);
}

const pool = createPool(config.databaseUrl, config.databaseSsl);
const providers = createProviders(config);

const app = createApp({
  config,
  providers,
  users: createUsersRepo(pool),
  checks: {
    database: () => checkDb(pool),
    ml_service: () => checkMl(config.mlServiceUrl, config.healthTimeoutMs),
  },
});

const server = app.listen(config.port, () => {
  console.log(`orbit-server listening on http://localhost:${config.port}`);
});

async function shutdown() {
  server.close();
  await pool.end().catch(() => {});
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
