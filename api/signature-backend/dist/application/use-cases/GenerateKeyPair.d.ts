import { KeyRepository } from "../../domain/repositories/KeyRepository";
import { NodeCryptoService } from "../../infrastructure/crypto/NodeCryptoService";
export declare class GenerateKeyPair {
    private readonly cryptoService;
    private readonly keyRepo;
    constructor(cryptoService: NodeCryptoService, keyRepo: KeyRepository);
    execute(alias: string): Promise<{
        publicKey: string;
        privateKey: string;
    }>;
}
