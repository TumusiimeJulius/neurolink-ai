import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "neurolink_secret";

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token." });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = {
      id: payload.id,
      email: payload.email,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
