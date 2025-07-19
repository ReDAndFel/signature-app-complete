"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
class FileController {
    uploadFile;
    getFileById;
    signFile;
    verifySignature;
    constructor(uploadFile, getFileById, signFile, verifySignature) {
        this.uploadFile = uploadFile;
        this.getFileById = getFileById;
        this.signFile = signFile;
        this.verifySignature = verifySignature;
    }
    upload = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const userId = req.userId;
            const file = req.file;
            if (!userId)
                return res.status(400).json({ error: "User ID is required" });
            const result = await this.uploadFile.execute(file, +userId);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
    getById = async (req, res) => {
        try {
            const fileId = +req.params.id;
            const file = await this.getFileById.execute(fileId);
            if (!file) {
                return res.status(404).json({ error: "File not found" });
            }
            return res.status(200).json(file);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
    sign = async (req, res) => {
        try {
            const fileId = +req.params.id;
            const { privateKey } = req.body;
            if (!privateKey)
                res.status(400).json({ error: "Primary key is required" });
            const file = await this.signFile.execute(fileId, privateKey);
            return res.status(200).json({ message: "File signed", file });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
    verify = async (req, res) => {
        try {
            const fileId = +req.params.id;
            if (!fileId)
                throw new Error("File ID is required");
            const isValid = await this.verifySignature.execute(fileId);
            return res.status(200).json({ valid: isValid });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    };
}
exports.FileController = FileController;
//# sourceMappingURL=FileController.js.map