import jwt, { SignOptions } from "jsonwebtoken";
import { AuthTokenPayload } from "../types/user";
import { Role } from "../constants/roles";

const SECRET = process.env.JWT_SECRET ?? "dev-secret-change-in-production";
const OPTIONS: SignOptions = { expiresIn: 60 * 60 * 24 * 7 };

export const signToken = (userId: number, role: Role): string =>
  jwt.sign({ sub: userId, role }, SECRET, OPTIONS);

export const verifyToken = (token: string): AuthTokenPayload => {
  const payload = jwt.verify(token, SECRET) as jwt.JwtPayload & AuthTokenPayload;
  return { sub: payload.sub, role: payload.role };
};
