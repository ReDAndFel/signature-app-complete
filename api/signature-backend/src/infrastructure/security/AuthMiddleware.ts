import { Request, Response, NextFunction } from "express";
import { JwtService } from "./JwtService";

export function AuthMiddleware(jwtService: JwtService) {
  return function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Buscar token en el header Authorization primero
    let token = req.headers.authorization?.split(" ")[1];
    
    // Si no hay token en el header, buscar en las cookies
    if (!token) {
      token = req.cookies?.accessToken;
    }
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const payload = jwtService.verify(token);
      req.userId = payload.sub;
      next();
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}
