import { KeyRepository } from "../../domain/repositories/KeyRepository";
import { KeyPair } from "../../domain/models/KeyPair";
import { SequelizeKeyModel } from "./models/SequelizeKeyModel";

export class SequelizeKeyRepository implements KeyRepository {
  async saveKey(keyPair: KeyPair): Promise<void> {
    console.log("Creando con alias:", keyPair.alias);
    console.log("Creando con publicKey:", keyPair.publicKey);
    try {
      const existing = await SequelizeKeyModel.findByPk(keyPair.id);
      if (existing) {
        await existing.update({
          alias: keyPair.alias,
          publicKey: keyPair.publicKey,
        });
      } else {
        console.log("Creando nuevo registro con:", keyPair);
        await SequelizeKeyModel.create({
          alias: keyPair.alias,
          publicKey: keyPair.publicKey,
        });
      }
    } catch (err) {
      console.error("🔥 Error en saveKey:", err);
      throw err;
    }
  }

  async getPublicKey(alias: string): Promise<KeyPair | null> {
    const key = await SequelizeKeyModel.findOne({ where: { alias } });
    return key ? new KeyPair(key.alias, key.publicKey, key.id) : null;
  }
}
