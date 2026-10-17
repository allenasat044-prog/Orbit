import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? "postgres://orbit:orbit@localhost:5433/orbit",
  databaseSsl: process.env.DATABASE_SSL === "true",
  mlServiceUrl: process.env.ML_SERVICE_URL ?? "http://localhost:8000",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  healthTimeoutMs: Number(process.env.HEALTH_TIMEOUT_MS ?? 3000),
  copernicusStacUrl: process.env.COPERNICUS_STAC_URL ?? "https://stac.dataspace.copernicus.eu/v1/",
  jwtSecret: process.env.JWT_SECRET ?? "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  authRateLimit: Number(process.env.AUTH_RATE_LIMIT ?? 30),
  rateLimitPerMin: Number(process.env.RATE_LIMIT_PER_MIN ?? 300),
};
