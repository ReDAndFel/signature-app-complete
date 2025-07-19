import { Request, Response } from "express";
import { GenerateKeyPair } from "../../../application/use-cases/GenerateKeyPair";
import { GetPublicKeyByAlias } from "../../../application/use-cases/GetPublicKeyByAlias";
import { GetPublicKeyByUser } from "../../../application/use-cases/GetPublicKeyByUser";
export declare class KeyController {
    private readonly generateKeyPair;
    private readonly getPublicKeyByAlias;
    private readonly getPublicKeyByUserId;
    constructor(generateKeyPair: GenerateKeyPair, getPublicKeyByAlias: GetPublicKeyByAlias, getPublicKeyByUserId: GetPublicKeyByUser);
    generate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getByAlias: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
