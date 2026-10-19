import { config } from "./config.js";
import { createPool, checkDb } from "./db.js";
import { checkMl } from "./mlClient.js";
import { createProviders } from "./providers/index.js";
import { createApp } from "./app.js";
import { createUsersRepo } from "./auth/usersRepo.js";
import { createAcquisitionsRepo } from "./imagery/repo.js";
import { createGeocoder } from "./geocode.js";
import { createStorage } from "./storage.js";
import { createTokenManager } from "./providers/copernicusAuth.js";
import { downloadToFile } from "./providers/download.js";
import { createJobsRepo } from "./jobs/repo.js";
import { createJobRunner } from "./jobs/runner.js";
import { createAssetsRepo, createChipsRepo } from "./imagery/chipRepo.js";
import { createChipHandler } from "./imagery/chipJob.js";
import { createChipRouter } from "./imagery/chipRoutes.js";
import { mlChip, mlCaption, mlModels, mlModel } from "./mlClient.js";
import { createCaptionsRepo } from "./captions/repo.js";
import { createCaptionHandler } from "./captions/job.js";
import { createCaptionRouter } from "./captions/routes.js";

if (config.jwtSecret.length < 32) {
  console.error("JWT_SECRET is missing or shorter than 32 characters. Set it in server/.env");
  process.exit(1);
}

const pool = createPool(config.databaseUrl, config.databaseSsl);
const providers = createProviders(config);

const storage = createStorage(config.storageDir);
const acquisitions = createAcquisitionsRepo(pool);
const chips = createChipsRepo(pool);
const jobs = createJobsRepo(pool);
const captions = createCaptionsRepo(pool);
const tokens = createTokenManager({ username: config.copernicusUsername, password: config.copernicusPassword, tokenUrl: config.copernicusTokenUrl });
const runner = createJobRunner({
  repo: jobs,
  concurrency: config.jobConcurrency,
  handlers: {
    generate_caption: createCaptionHandler({ chips, captions, mlCaption: (body) => mlCaption(config.mlServiceUrl, body) }),
    prepare_chip: createChipHandler({
      acquisitions, chips, tokens, storage,
      assets: createAssetsRepo(pool),
      download: downloadToFile,
      mlChip: (body) => mlChip(config.mlServiceUrl, body),
      limits: { maxBytes: config.maxDownloadBytes, allowedHosts: config.downloadAllowedHosts, timeoutMs: config.downloadTimeoutMs },
    }),
  },
});

const app = createApp({
  routers: [
    { path: "/api", router: createChipRouter({ config, acquisitions, chips, jobs, runner, storage }) },
    { path: "/api", router: createCaptionRouter({ config, chips, captions, runner, ml: { models: () => mlModels(config.mlServiceUrl), model: (id) => mlModel(config.mlServiceUrl, id) } }) },
  ],
  config,
  providers,
  users: createUsersRepo(pool),
  acquisitions,
  geocoder: createGeocoder({ baseUrl: config.geocoderUrl, userAgent: config.geocoderUserAgent }),
  checks: {
    database: () => checkDb(pool),
    ml_service: () => checkMl(config.mlServiceUrl, config.healthTimeoutMs),
  },
});

const server = app.listen(config.port, () => {
  console.log(`orbit-server listening on http://localhost:${config.port}`);
  runner.recover().catch((err) => console.error("job recovery failed:", err.message));
});

async function shutdown() {
  server.close();
  await pool.end().catch(() => {});
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
