import { Request, Response } from "express";
import { GetUserByEmail } from "../../../application/use-cases/GetUserByEmail";
import { GetUserById } from "../../../application/use-cases/GetUserById";
export declare class UserController {
    private readonly userCaseGetUserByEmail;
    private readonly userCaseGetUserById;
    constructor(userCaseGetUserByEmail: GetUserByEmail, userCaseGetUserById: GetUserById);
    getUserByEmail(req: Request, res: Response): Promise<void>;
    getUserById(req: Request, res: Response): Promise<void>;
}
