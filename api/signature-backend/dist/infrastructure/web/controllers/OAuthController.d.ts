import { Request, Response } from "express";
import { SaveUser } from "../../../application/use-cases/SaveUser";
import { JwtService } from "../../security/JwtService";
export declare class OAuthController {
    private readonly saveUser;
    private readonly jwtService;
    constructor(saveUser: SaveUser, jwtService: JwtService);
    handleOAuthCallback: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
