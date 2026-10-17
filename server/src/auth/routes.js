import express from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { HttpError, asyncHandler, sendError } from "../errors.js";
import { hashPassword, verifyPassword, DUMMY_HASH } from "./password.js";
import { signToken } from "./tokens.js";
import { requireAuth } from "./middleware.js";
import { EmailTakenError } from "./usersRepo.js";

const email = z
  .string({ required_error: "Enter a valid email address." })
  .trim()
  .toLowerCase()
  .max(254, "Enter a valid email address.")
  .email("Enter a valid email address.");

const signupSchema = z.object({
  name: z.string({ required_error: "Enter your name." }).trim().min(1, "Enter your name.").max(100, "Name is too long."),
  email,
  password: z
    .string({ required_error: "Password must be at least 8 characters." })
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be at most 128 characters."),
});

const loginSchema = z.object({
  email,
  password: z.string({ required_error: "Enter your password." }).min(1, "Enter your password.").max(128),
});

function parse(schema, body) {
  const result = schema.safeParse(body ?? {});
  if (!result.success) {
    const issues = result.error.issues;
    throw new HttpError(400, "validation_error", issues[0].message, issues.map((i) => ({ field: i.path.join("."), message: i.message })));
  }
  return result.data;
}

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role, created_at: u.created_at });

export function createAuthRouter({ config, users }) {
  const router = express.Router();

  router.use(
    rateLimit({
      windowMs: 15 * 60_000,
      limit: config.authRateLimit,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (_req, res) => sendError(res, 429, "rate_limited", "Too many attempts. Try again later."),
    }),
  );

  router.post(
    "/signup",
    asyncHandler(async (req, res) => {
      const { name, email, password } = parse(signupSchema, req.body);
      let user;
      try {
        user = await users.create({ name, email, passwordHash: await hashPassword(password) });
      } catch (err) {
        if (err instanceof EmailTakenError) throw new HttpError(409, "email_taken", "An account with this email already exists.");
        throw err;
      }
      res.status(201).json({ token: signToken(user, config), user: publicUser(user) });
    }),
  );

  router.post(
    "/login",
    asyncHandler(async (req, res) => {
      const { email, password } = parse(loginSchema, req.body);
      const user = await users.findByEmail(email);
      const ok = await verifyPassword(password, user ? user.password_hash : DUMMY_HASH);
      if (!user || !ok) throw new HttpError(401, "invalid_credentials", "Invalid email or password.");
      res.json({ token: signToken(user, config), user: publicUser(user) });
    }),
  );

  router.get(
    "/me",
    requireAuth(config),
    asyncHandler(async (req, res) => {
      const user = await users.findById(req.auth.userId);
      if (!user) throw new HttpError(401, "unauthorized", "Account no longer exists");
      res.json({ user: publicUser(user) });
    }),
  );

  return router;
}
