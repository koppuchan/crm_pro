import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";
import { Role } from "../constants/roles";

export const authenticate: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next(new AppError(401, "認証が必要です"));
  }

  try {
    req.auth = verifyToken(header.slice(7));
    next();
  } catch {
    next(new AppError(401, "トークンが無効または期限切れです"));
  }
};

export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return next(new AppError(403, "アクセスが拒否されました"));
    }
    next();
  };
