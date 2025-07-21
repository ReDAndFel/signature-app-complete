import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";
import { FileRepository } from "../../domain/repositories/FileRepository";
import { FileSignatures } from "../../domain/models/FileSignatures";

export class SignFile {
    constructor(
        private readonly fileSignatureRepo: FileSignatureRepository,
        private readonly fileRepository: FileRepository
    ) {}

    async execute(userId: number, fileId: number, privateKeyFile: Express.Multer.File): Promise<FileSignatures> {
        try {
            const file = await this.fileRepository.getFileById(fileId);
            if (!file) throw new Error("File not found");
            const filePath = file.path;

            if (!privateKeyFile || !privateKeyFile.buffer) throw new Error("Private key file is required");
            
            const fileSigned = await this.fileSignatureRepo.signFile(userId, fileId, filePath, privateKeyFile);
            return fileSigned;
        }
        catch (error: any) {
            throw new Error(`Error signing file: ${error.message}`);
        }
    }
}