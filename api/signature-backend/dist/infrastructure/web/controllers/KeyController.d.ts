import { Request, Response } from "express";
import { GenerateKeyPair } from "../../../application/use-cases/GenerateKeyPair";
import { GetPublicKeyByAlias } from "../../../application/use-cases/GetPublicKeyByAlias";
export declare class KeyController {
    private readonly generateKeyPair;
    private readonly getPublicKeyByAlias;
    constructor(generateKeyPair: GenerateKeyPair, getPublicKeyByAlias: GetPublicKeyByAlias);
    generate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getByAlias: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
