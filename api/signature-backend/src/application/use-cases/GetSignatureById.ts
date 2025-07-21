import { FileSignatures } from "../../domain/models/FileSignatures";
import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";

export class GetSignatureById {
    constructor(private readonly fileSignatureRepo: FileSignatureRepository) {}

    async execute(id: number): Promise<FileSignatures | null> {
        try {
            const signature = await this.fileSignatureRepo.getSignatureById(id);
            if (!signature) throw new Error("Signature not found");
            return signature;
        } catch (error: any) {
            throw new Error(`Error retrieving signature: ${error.message}`);
        }
    }
}