import { HttpError } from "../errors.js";
import { verifyToken } from "./tokens.js";

export function requireAuth(config) {
  return (req, _res, next) => {
    const header = req.headers.authorization ?? "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      return next(new HttpError(401, "unauthorized", "Missing or malformed Authorization header"));
    }
    try {
      req.auth = verifyToken(token, config);
      next();
    } catch {
      next(new HttpError(401, "unauthorized", "Invalid or expired token"));
    }
  };
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.auth) return next(new HttpError(401, "unauthorized", "Authentication required"));
    if (!roles.includes(req.auth.role)) return next(new HttpError(403, "forbidden", "Insufficient permissions"));
    next();
  };
}
