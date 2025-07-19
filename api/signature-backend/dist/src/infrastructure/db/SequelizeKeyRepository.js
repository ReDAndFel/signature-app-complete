"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeKeyRepository = void 0;
const KeyPair_1 = require("../../domain/models/KeyPair");
const index_1 = require("./models/index");
class SequelizeKeyRepository {
    async saveKey(keyPair) {
        try {
            const existing = await index_1.SequelizeKeyModel.findByPk(keyPair.id);
            if (existing) {
                await existing.update({
                    alias: keyPair.alias,
                    publicKey: keyPair.publicKey,
                });
            }
            else {
                await index_1.SequelizeKeyModel.create({
                    alias: keyPair.alias,
                    publicKey: keyPair.publicKey,
                    userId: keyPair.userId,
                });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async getPublicKey(alias) {
        const key = await index_1.SequelizeKeyModel.findOne({ where: { alias } });
        return key
            ? new KeyPair_1.KeyPair(key.alias, key.publicKey, key.userId, key.id)
            : null;
    }
    async getPuyblicKeyByUserId(userId) {
        const key = await index_1.SequelizeKeyModel.findOne({ where: { userId } });
        return key
            ? new KeyPair_1.KeyPair(key.alias, key.publicKey, key.userId, key.id)
            : null;
    }
}
exports.SequelizeKeyRepository = SequelizeKeyRepository;
//# sourceMappingURL=SequelizeKeyRepository.js.map