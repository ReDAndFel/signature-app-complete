import { KeyPair } from "../../domain/models/KeyPair";
import { KeyRepository } from "../../domain/repositories/KeyRepository";

export class GetPublicKeyByUser {
    constructor(private readonly keyRepo: KeyRepository) {}

    async execute(userId: number): Promise<KeyPair | null> {
        const keyPair = await this.keyRepo.getPuyblicKeyByUserId(userId);
        if (!keyPair) return null;

        return keyPair;
    }
}