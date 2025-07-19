import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";
import crypto from "crypto";
import fs from "fs";

export class SignFile {
    constructor(
        private readonly fileRepository: FileRepository
    ) {}

    async execute(fileId: number, privateKeyPem: string): Promise<File> {
        const file = await this.fileRepository.getFileById(fileId);
        if (!file) throw new Error("File not found");

        try {

            const fileBuffer = fs.readFileSync(file.path);


            const signature = crypto.createSign('SHA256');
            signature.update(fileBuffer);
            signature.end();
            const sign = signature.sign(privateKeyPem, 'base64');
            
            file.hash = sign;
            await this.fileRepository.updateFileHash(fileId, sign);
        }
        catch (error: any) {
            throw new Error(`Error signing file: ${error.message}`);
        }

        return file;
    }
}