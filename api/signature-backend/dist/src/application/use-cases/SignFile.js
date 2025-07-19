"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignFile = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
class SignFile {
    fileRepository;
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async execute(fileId, hash) {
        const file = await this.fileRepository.getFileById(fileId);
        if (!file)
            throw new Error("File not found");
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const signature = crypto_1.default.createSign('SHA256');
        signature.update(fileBuffer);
        signature.end();
        const sign = signature.sign(hash, 'base64');
        file.hash = sign;
        await this.fileRepository.updateFileHash(fileId, hash);
        return file;
    }
}
exports.SignFile = SignFile;
//# sourceMappingURL=SignFile.js.map