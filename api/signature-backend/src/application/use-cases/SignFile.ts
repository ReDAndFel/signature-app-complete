import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";
import crypto from "crypto";
import fs from "fs";

export class SignFile {
    constructor(
        private readonly fileRepository: FileRepository
    ) {}

    async execute(fileId: number, hash: string): Promise<File> {
        const file = await this.fileRepository.getFileById(fileId);
        if (!file) throw new Error("File not found");

        const fileBuffer = fs.readFileSync(file.path);

        const signature = crypto.createSign('SHA256');
        signature.update(fileBuffer);
        signature.end();
        const sign = signature.sign(hash, 'base64');

        file.hash = sign;
        await this.fileRepository.updateFileHash(fileId, hash);

        return file;
    }
}