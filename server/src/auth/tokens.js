import jwt from "jsonwebtoken";

export function signToken(user, config) {
  return jwt.sign({ role: user.role }, config.jwtSecret, {
    algorithm: "HS256",
    subject: user.id,
    expiresIn: config.jwtExpiresIn,
  });
}

export function verifyToken(token, config) {
  const payload = jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"] });
  return { userId: payload.sub, role: payload.role };
}
