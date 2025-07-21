import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";

export class VerifyFileSignature {
    constructor(
        private readonly signatureRepository: FileSignatureRepository
    ) {}

    async execute(fileId: number, userId: number): Promise<boolean> {
        const file = await this.signatureRepository.getSignatureById(fileId);
        console.log("File:", file);
        if (!file || file.fileId) throw new Error("File not found");

        const verified = await this.signatureRepository.verifySignature(fileId, userId);

        return verified;
    }
}