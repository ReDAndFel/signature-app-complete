import { Request, Response, NextFunction } from "express";
import { JwtService } from "./JwtService";
export declare function AuthMiddleware(jwtService: JwtService): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
