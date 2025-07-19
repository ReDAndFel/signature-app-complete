"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFileById = void 0;
class GetFileById {
    fileRepo;
    constructor(fileRepo) {
        this.fileRepo = fileRepo;
    }
    async execute(fileId) {
        if (!fileId) {
            throw new Error('File ID must be provided');
        }
        const file = await this.fileRepo.getFileById(fileId);
        if (!file) {
            throw new Error(`File with ID ${fileId} not found`);
        }
        return file;
    }
}
exports.GetFileById = GetFileById;
//# sourceMappingURL=GetFileById.js.map