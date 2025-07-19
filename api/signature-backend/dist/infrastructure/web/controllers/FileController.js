"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
class FileController {
    uploadFile;
    getFileById;
    constructor(uploadFile, getFileById) {
        this.uploadFile = uploadFile;
        this.getFileById = getFileById;
    }
    upload = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const userId = req.user?.id || 1;
            const file = await req.file;
            file.userId = userId;
            const result = await this.uploadFile.execute(file);
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
}
exports.FileController = FileController;
//# sourceMappingURL=FileController.js.map