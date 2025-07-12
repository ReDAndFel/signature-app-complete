"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeKeyRepository = void 0;
const KeyPair_1 = require("../../domain/models/KeyPair");
const SequelizeKeyModel_1 = require("./models/SequelizeKeyModel");
class SequelizeKeyRepository {
    async saveKey(keyPair) {
        console.log("Creando con alias:", keyPair.alias);
        console.log("Creando con publicKey:", keyPair.publicKey);
        try {
            const existing = await SequelizeKeyModel_1.SequelizeKeyModel.findByPk(keyPair.id);
            if (existing) {
                await existing.update({
                    alias: keyPair.alias,
                    publicKey: keyPair.publicKey,
                });
            }
            else {
                console.log("Creando nuevo registro con:", keyPair);
                await SequelizeKeyModel_1.SequelizeKeyModel.create({
                    alias: keyPair.alias,
                    publicKey: keyPair.publicKey,
                });
            }
        }
        catch (err) {
            console.error("🔥 Error en saveKey:", err);
            throw err;
        }
    }
    async getPublicKey(alias) {
        const key = await SequelizeKeyModel_1.SequelizeKeyModel.findOne({ where: { alias } });
        return key ? new KeyPair_1.KeyPair(key.alias, key.publicKey, key.id) : null;
    }
}
exports.SequelizeKeyRepository = SequelizeKeyRepository;
//# sourceMappingURL=SequelizeKeyRepository.js.map