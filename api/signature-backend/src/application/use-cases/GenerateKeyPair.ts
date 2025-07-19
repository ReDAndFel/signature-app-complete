import { KeyRepository } from "../../domain/repositories/KeyRepository";
import { NodeCryptoService } from "../../infrastructure/crypto/NodeCryptoService";
import { KeyPair } from "../../domain/models/KeyPair";

export class GenerateKeyPair {
  constructor(
    private readonly cryptoService: NodeCryptoService,
    private readonly keyRepo: KeyRepository
  ) {}

  async execute(
    alias: string,
    userId: number
  ): Promise<{ publicKey: string; privateKey: string }> {
    const { publicKey, privateKey } = this.cryptoService.generateKeyPair();
    const keyPair = new KeyPair(alias, publicKey, userId);
    await this.keyRepo.saveKey(keyPair);
    return { publicKey: keyPair.publicKey, privateKey };
  }
}
