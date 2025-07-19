import { KeyPair } from "../../domain/models/KeyPair";
import { KeyRepository } from "../../domain/repositories/KeyRepository";
export declare class GetPublicKeyByUser {
    private readonly keyRepo;
    constructor(keyRepo: KeyRepository);
    execute(userId: number): Promise<KeyPair | null>;
}
