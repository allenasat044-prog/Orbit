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
import { createChipHandler, createAssetEnsurer } from "./imagery/chipJob.js";
import { createChipRouter } from "./imagery/chipRoutes.js";
import { mlChip, mlCaption, mlModels, mlModel, mlClassify, mlScore, mlLabelChip, mlChange } from "./mlClient.js";
import { createWeatherProvider } from "./weather/openMeteo.js";
import { createWeatherRouter } from "./weather/routes.js";
import { createAnalysesRepo } from "./analysis/repo.js";
import { createAnalysisHandler } from "./analysis/job.js";
import { createAnalysisRouter } from "./analysis/routes.js";
import { createComparisonsRepo } from "./comparisons/repo.js";
import { createCompareHandler } from "./comparisons/job.js";
import { createComparisonRouter } from "./comparisons/routes.js";
import { createCaptionsRepo } from "./captions/repo.js";
import { createCaptionHandler } from "./captions/job.js";
import { createCaptionRouter } from "./captions/routes.js";
import { createRegionsRepo } from "./regions/repo.js";
import { createRegionRouter } from "./regions/routes.js";
import { createUpdateRunsRepo } from "./updates/repo.js";
import { createUpdateEngine } from "./updates/engine.js";
import { createSceneProcessor } from "./updates/process.js";
import { createUpdateRouter } from "./updates/routes.js";

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
const chipHandler = createChipHandler({
  acquisitions, chips, tokens, storage,
  assets: createAssetsRepo(pool),
  download: downloadToFile,
  mlChip: (body) => mlChip(config.mlServiceUrl, body),
  limits: { maxBytes: config.maxDownloadBytes, allowedHosts: config.downloadAllowedHosts, timeoutMs: config.downloadTimeoutMs },
});
const downloadLimits = { maxBytes: config.maxDownloadBytes, allowedHosts: config.downloadAllowedHosts, timeoutMs: config.downloadTimeoutMs };
const assetsRepo = createAssetsRepo(pool);
const ensureAsset = createAssetEnsurer({ assets: assetsRepo, tokens, storage, download: downloadToFile, limits: downloadLimits });
const analyses = createAnalysesRepo(pool);
const weather = createWeatherProvider({ baseUrl: config.weatherUrl, ttlMs: config.weatherCacheTtlMs });
const captionHandler = createCaptionHandler({ chips, captions, mlCaption: (body) => mlCaption(config.mlServiceUrl, body) });
const comparisons = createComparisonsRepo(pool);
const regions = createRegionsRepo(pool);
const updateRuns = createUpdateRunsRepo(pool);
const engine = createUpdateEngine({ regions, runs: updateRuns, acquisitions, providers, processScene: createSceneProcessor({ chipHandler, captionHandler }) });
const runner = createJobRunner({
  repo: jobs,
  concurrency: config.jobConcurrency,
  handlers: {
    prepare_chip: chipHandler,
    generate_caption: captionHandler,
    analyze_change: createAnalysisHandler({
      acquisitions, chips, analyses, chipHandler, ensureAsset, storage,
      mlLabelChip: (b) => mlLabelChip(config.mlServiceUrl, b),
      mlChange: (b) => mlChange(config.mlServiceUrl, b),
    }),
    compare_models: createCompareHandler({
      chips, captions, captionHandler, comparisons,
      listModels: () => mlModels(config.mlServiceUrl),
      classify: (b) => mlClassify(config.mlServiceUrl, b),
      score: (b) => mlScore(config.mlServiceUrl, b),
    }),
    update_run: async ({ run_id, user_id, role }) => {
      const run = await engine.execute(run_id, { userId: user_id, role });
      return { run_id, status: run.status };
    },
  },
});

const app = createApp({
  routers: [
    { path: "/api", router: createChipRouter({ config, acquisitions, chips, jobs, runner, storage }) },
    { path: "/api", router: createWeatherRouter({ config, weather }) },
    { path: "/api", router: createAnalysisRouter({ config, acquisitions, analyses, runner, storage }) },
    { path: "/api", router: createRegionRouter({ config, regions }) },
    { path: "/api", router: createUpdateRouter({ config, runs: updateRuns, runner }) },
    { path: "/api", router: createComparisonRouter({ config, chips, comparisons, runner }) },
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
  updateRuns.recoverInterrupted()
    .then(() => runner.recover())
    .catch((err) => console.error("job recovery failed:", err.message));
});

async function shutdown() {
  server.close();
  await pool.end().catch(() => {});
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
