import { FileSignatures } from "../../domain/models/FileSignatures";
import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";

export class ListSignaturesByUserId {
    constructor(
        private readonly fileSignatureRepo: FileSignatureRepository
    ) {}

    async execute(userId: number): Promise<FileSignatures[]> {
        try {
            const signatures = await this.fileSignatureRepo.listSignaturesByUserId(userId);
            if (!signatures || signatures.length === 0) throw new Error("No signatures found for this user");
            return signatures;
        } catch (error: any) {
            throw new Error(`Error listing signatures by user ID: ${error.message}`);
        }
    }
}