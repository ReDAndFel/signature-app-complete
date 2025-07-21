import { GetFileById } from "../../../application/use-cases/GetFileById";
import { UploadFile } from "../../../application/use-cases/UploadFile";
import { Request, Response } from "express";


export class FileController {
    constructor(
        private readonly uploadFile: UploadFile,
        private readonly getFileById: GetFileById
    ) {}

    upload = async (req: Request, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const userId = req.userId; 
            const file = req.file;
            if (!userId) return res.status(400).json({ error: "User ID is required" });
            const result = await this.uploadFile.execute(file, +userId);
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
}