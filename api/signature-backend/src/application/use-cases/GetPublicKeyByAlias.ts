import { KeyPair } from "../../domain/models/KeyPair";
import { KeyRepository } from "../../domain/repositories/KeyRepository";

export class GetPublicKeyByAlias {
  constructor(private readonly keyRepo: KeyRepository) {}

  async execute(alias: string): Promise<KeyPair | null> {
    const keyPair = await this.keyRepo.getPublicKey(alias);
    if (!keyPair) return null;

    return keyPair;
  }
}
