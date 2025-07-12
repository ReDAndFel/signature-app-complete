import { KeyRepository } from "../../domain/repositories/KeyRepository";
import { KeyPair } from "../../domain/models/KeyPair";
import { SequelizeKeyModel } from "./models/SequelizeKeyModel";

export class SequelizeKeyRepository implements KeyRepository {
  async saveKey(keyPair: KeyPair): Promise<void> {
    await SequelizeKeyModel.upsert({
      alias: keyPair.alias,
      publicKey: keyPair.publicKey,
    });
  }

  async getPublicKey(alias: string): Promise<KeyPair | null> {
    const key = await SequelizeKeyModel.findOne({ where: { alias } });
    return key ? new KeyPair(key.alias, key.publicKey) : null;
  }
}
