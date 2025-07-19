"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
class UploadFile {
    fileRepo;
    constructor(fileRepo) {
        this.fileRepo = fileRepo;
    }
    async execute(file) {
        // Validate the file (e.g., check size, type)
        if (!this.isValidFile(file)) {
            throw new Error("Invalid file");
        }
        // Save the file using the repository
        const savedFile = await this.fileRepo.saveFile(file);
        return savedFile;
    }
    isValidFile(file) {
        if (!file || !file.fileName || file.size <= 0 || !file.mimeType) {
            return false; // Basic validation for file properties
        }
        return true; // Placeholder for actual validation logic
    }
}
exports.UploadFile = UploadFile;
//# sourceMappingURL=UploadFile.js.map