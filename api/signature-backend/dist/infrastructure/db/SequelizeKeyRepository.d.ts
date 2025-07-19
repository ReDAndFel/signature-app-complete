import { KeyRepository } from "../../domain/repositories/KeyRepository";
import { KeyPair } from "../../domain/models/KeyPair";
export declare class SequelizeKeyRepository implements KeyRepository {
    saveKey(keyPair: KeyPair): Promise<void>;
    getPublicKey(alias: string): Promise<KeyPair | null>;
}
