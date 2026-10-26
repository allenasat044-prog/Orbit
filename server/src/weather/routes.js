import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { ProviderError } from "../providers/http.js";

const empty = (v) => (v === "" || v === null ? undefined : v);
const schema = z.object({
  lat: z.preprocess(empty, z.coerce.number({ required_error: "lat is required", invalid_type_error: "lat must be a number" }).min(-90).max(90)),
  lon: z.preprocess(empty, z.coerce.number({ required_error: "lon is required", invalid_type_error: "lon must be a number" }).min(-180).max(180)),
  days: z.preprocess(empty, z.coerce.number().int().min(1).max(10).default(3)),
});

function mapProviderError(err) {
  if (!(err instanceof ProviderError)) return err;
  if (err.code === "provider_timeout") return new HttpError(504, "weather_timeout", "The weather service timed out. Try again shortly.");
  const details = err.status ? { upstream_status: err.status, upstream_body: err.body } : undefined;
  return new HttpError(502, "weather_unavailable", "The weather service is unavailable right now.", details);
}

export function createWeatherRouter({ config, weather }) {
  const router = express.Router();
  router.get(
    "/weather/forecast",
    rateLimit({ windowMs: 60_000, limit: config.weatherRateLimit ?? 30, standardHeaders: true, legacyHeaders: false, handler: (_q, res) => sendError(res, 429, "rate_limited", "Too many weather requests. Try again in a minute.") }),
    asyncHandler(async (req, res) => {
      const parsed = schema.safeParse(req.query);
      if (!parsed.success) throw new HttpError(400, "validation_error", `${parsed.error.issues[0].path.join(".") || "request"}: ${parsed.error.issues[0].message}`);
      try {
        res.json(await weather.forecast(parsed.data));
      } catch (err) {
        throw mapProviderError(err);
      }
    }),
  );
  return router;
}
