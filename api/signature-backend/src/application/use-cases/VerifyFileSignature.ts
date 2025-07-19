import { FileRepository } from "../../domain/repositories/FileRepository";
import { KeyRepository } from "../../domain/repositories/KeyRepository";
import fs from "fs";
import crypto from "crypto";

export class VerifyFileSignature {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly keyRepository: KeyRepository
    ) {}

    async execute(fileId: number): Promise<boolean> {
        const file = await this.fileRepository.getFileById(fileId);
        if (!file || !file.hash) throw new Error("File not found or not signed");

        const fileBuffer = fs.readFileSync(file.path);

        const userId = file.userId;

        if (userId === undefined) throw new Error("File does not have an associated userId");

        const key = await this.keyRepository.getPuyblicKeyByUserId(userId);
        if (!key) throw new Error("Public key not found for user");
        
        const verify = crypto.createVerify('SHA256');
        verify.update(fileBuffer);
        verify.end();

        return verify.verify(key.publicKey, file.hash, 'base64');
    }
}