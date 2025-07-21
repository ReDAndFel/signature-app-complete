import { FileSignatures } from "../../domain/models/FileSignatures";
import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";

export class ListSignaturesByFileId {
    constructor(private readonly fileSignatureRepo: FileSignatureRepository) {}

    async execute(fileId: number): Promise<FileSignatures[]> {
        try {
            const signatures = await this.fileSignatureRepo.listSignaturesByFileId(fileId);
            if (!signatures || signatures.length === 0) throw new Error("No signatures found for this file");
            return signatures;
        } catch (error: any) {
            throw new Error(`Error retrieving signatures: ${error.message}`);
        }
    }
}