import { GetFileById } from "../../../application/use-cases/GetFileById";
import { UploadFile } from "../../../application/use-cases/UploadFile";
import { Request, Response } from "express";
import { VerifyFileSignature } from "../../../application/use-cases/VerifyFileSignature";
import { SignFile } from "../../../application/use-cases/SignFile";


export class FileController {
    constructor(
        private readonly uploadFile: UploadFile,
        private readonly getFileById: GetFileById,
        private readonly signFile: SignFile, 
        private readonly verifySignature: VerifyFileSignature
    ) {}

    upload = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const userId = (req.userId as number); 
            const file = req.file;
            const result = await this.uploadFile.execute(file, userId);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const fileId = +req.params.id;
            const file = await this.getFileById.execute(fileId);
            if (!file) {
                return res.status(404).json({ error: "File not found" });
            }
            return res.status(200).json(file);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    sign = async (req: Request, res: Response) => {
        try {
            const fileId = +req.params.id;
            const { privateKey } = req.body;

            if (!privateKey) res.status(400).json({ error: "Primary key is required" });

            const file = await this.signFile.execute(fileId, privateKey);
            return res.status(200).json({ message: "File signed", file});
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

    verify = async (req: Request, res: Response) => {
        try {
            const fileId = +req.params.id;

            if (!fileId) throw new Error("File ID is required");

            const isValid = await this.verifySignature.execute(fileId);
            return res.status(200).json({ valid: isValid });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };
}