import { Request, Response, NextFunction } from "express";
import { JwtService } from "./JwtService";

export function AuthMiddleware(jwtService: JwtService) {
  return function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const payload = jwtService.verify(token);
      req.userId = payload.sub;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}
