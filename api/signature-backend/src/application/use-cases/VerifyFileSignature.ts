import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";

export class VerifyFileSignature {
    constructor(
        private readonly signatureRepository: FileSignatureRepository
    ) {}

    async execute(signatureId: number, userId: number): Promise<boolean> {
        const verified = await this.signatureRepository.verifySignature(signatureId, userId);

        return verified;
    }
}