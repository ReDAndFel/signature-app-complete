"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyFileSignature = void 0;
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
class VerifyFileSignature {
    fileRepository;
    keyRepository;
    constructor(fileRepository, keyRepository) {
        this.fileRepository = fileRepository;
        this.keyRepository = keyRepository;
    }
    async execute(fileId) {
        const file = await this.fileRepository.getFileById(fileId);
        if (!file || !file.hash)
            throw new Error("File not found or not signed");
        const fileBuffer = fs_1.default.readFileSync(file.path);
        const userId = file.userId;
        if (userId === undefined)
            throw new Error("File does not have an associated userId");
        const key = await this.keyRepository.getPuyblicKeyByUserId(userId);
        if (!key)
            throw new Error("Public key not found for user");
        const verify = crypto_1.default.createVerify('SHA256');
        verify.update(fileBuffer);
        verify.end();
        return verify.verify(key.publicKey, file.hash, 'base64');
    }
}
exports.VerifyFileSignature = VerifyFileSignature;
//# sourceMappingURL=VerifyFileSignature.js.map