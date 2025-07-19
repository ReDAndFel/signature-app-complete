import { KeyPair } from "../../domain/models/KeyPair";
import { KeyRepository } from "../../domain/repositories/KeyRepository";
export declare class GetPublicKeyByAlias {
    private readonly keyRepo;
    constructor(keyRepo: KeyRepository);
    execute(alias: string): Promise<KeyPair | null>;
}
