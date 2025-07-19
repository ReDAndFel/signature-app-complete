import { FileRepository } from "../../domain/repositories/FileRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import fs from "fs";
import crypto from "crypto";

export class VerifyFileSignature {
    constructor(
        private readonly fileRepository: FileRepository,
        private readonly userRepository: UserRepository
    ) {}

    async execute(fileId: number): Promise<boolean> {
        const file = await this.fileRepository.getFileById(fileId);
        if (!file || !file.hash) throw new Error("File not found or not signed");

        const fileBuffer = fs.readFileSync(file.path);

        const userId = file.userId;

        if (userId === undefined) throw new Error("File does not have an associated userId");

        const user = await this.userRepository.getUserById(userId);
        if (!user || !user.publicKey) throw new Error("User not found or does not have a public key");

        const verify = crypto.createVerify('SHA256');
        verify.update(fileBuffer);
        verify.end();

        return verify.verify(user.publicKey, file.hash, 'base64');
    }
}