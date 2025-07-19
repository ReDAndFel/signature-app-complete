"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateKeyPair = void 0;
const KeyPair_1 = require("../../domain/models/KeyPair");
class GenerateKeyPair {
    cryptoService;
    keyRepo;
    constructor(cryptoService, keyRepo) {
        this.cryptoService = cryptoService;
        this.keyRepo = keyRepo;
    }
    async execute(alias, userId) {
        const { publicKey, privateKey } = this.cryptoService.generateKeyPair();
        const keyPair = new KeyPair_1.KeyPair(alias, publicKey, userId);
        await this.keyRepo.saveKey(keyPair);
        return { publicKey: keyPair.publicKey, privateKey };
    }
}
exports.GenerateKeyPair = GenerateKeyPair;
//# sourceMappingURL=GenerateKeyPair.js.map