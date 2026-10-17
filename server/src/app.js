import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { runCheck } from "./checks.js";
import { HttpError, sendError } from "./errors.js";
import { createAuthRouter } from "./auth/routes.js";

export function createApp({ config, checks, providers, users }) {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: "1mb" }));
  app.use(
    rateLimit({
      windowMs: 60_000,
      limit: config.rateLimitPerMin,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, res) => sendError(res, 429, "rate_limited", "Too many requests"),
    }),
  );

  if (users) app.use("/api/auth", createAuthRouter({ config, users }));

  app.get("/api/health", async (_req, res) => {
    const names = Object.keys(checks);
    const results = await Promise.all(names.map((n) => runCheck(checks[n])));
    const components = Object.fromEntries(names.map((n, i) => [n, results[i]]));
    const healthy = results.every((r) => r.status === "ok");
    res.status(healthy ? 200 : 503).json({
      status: healthy ? "ok" : "degraded",
      time: new Date().toISOString(),
      components,
    });
  });

  app.get("/api/providers", async (_req, res) => {
    const items = await Promise.all(
      [...providers.values()].map(async (p) => {
        const check = await runCheck(() => p.healthCheck());
        return { id: p.id, name: p.name, ...check };
      }),
    );
    res.json({ items });
  });

  app.use((req, res) => {
    sendError(res, 404, "not_found", `No route for ${req.method} ${req.path}`);
  });

  app.use((err, _req, res, _next) => {
    if (err instanceof HttpError) return sendError(res, err.status, err.code, err.message, err.details);
    if (err.type === "entity.parse.failed") {
      return sendError(res, 400, "invalid_json", "Request body is not valid JSON");
    }
    if (err.type === "entity.too.large") {
      return sendError(res, 413, "payload_too_large", "Request body too large");
    }
    console.error(err);
    sendError(res, 500, "internal_error", "Internal server error");
  });

  return app;
}
