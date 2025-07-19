import { GetFileById } from "../../../application/use-cases/GetFileById";
import { UploadFile } from "../../../application/use-cases/UploadFile";
import { Request, Response } from "express";
import { VerifyFileSignature } from "../../../application/use-cases/VerifyFileSignature";
import { SignFile } from "../../../application/use-cases/SignFile";
export declare class FileController {
    private readonly uploadFile;
    private readonly getFileById;
    private readonly signFile;
    private readonly verifySignature;
    constructor(uploadFile: UploadFile, getFileById: GetFileById, signFile: SignFile, verifySignature: VerifyFileSignature);
    upload: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    sign: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    verify: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
