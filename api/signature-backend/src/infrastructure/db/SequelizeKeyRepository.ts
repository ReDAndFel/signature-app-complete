import { KeyRepository } from "../../domain/repositories/KeyRepository";
import { KeyPair } from "../../domain/models/KeyPair";
import { SequelizeKeyModel } from "./models/SequelizeKeyModel";

export class SequelizeKeyRepository implements KeyRepository {
  async saveKey(keyPair: KeyPair): Promise<void> {
    try {
      const existing = await SequelizeKeyModel.findByPk(keyPair.id);
      if (existing) {
        await existing.update({
          alias: keyPair.alias,
          publicKey: keyPair.publicKey,
        });
      } else {
        await SequelizeKeyModel.create({
          alias: keyPair.alias,
          publicKey: keyPair.publicKey,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  async getPublicKey(alias: string): Promise<KeyPair | null> {
    const key = await SequelizeKeyModel.findOne({ where: { alias } });
    return key ? new KeyPair(key.alias, key.publicKey, key.id) : null;
  }
}
