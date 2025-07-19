import { GetFileById } from "../../../application/use-cases/GetFileById";
import { UploadFile } from "../../../application/use-cases/UploadFile";
import { Request, Response } from "express";
import { File } from "../../../domain/models/File";
declare global {
    namespace Express {
        interface Request {
            file?: File;
        }
    }
}
export declare class FileController {
    private readonly uploadFile;
    private readonly getFileById;
    constructor(uploadFile: UploadFile, getFileById: GetFileById);
    upload: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
