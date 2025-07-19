"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeCryptoService = void 0;
const crypto_1 = require("crypto");
class NodeCryptoService {
    generateKeyPair() {
        const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "pkcs1", format: "pem" },
            privateKeyEncoding: { type: "pkcs1", format: "pem" },
        });
        return { publicKey, privateKey };
    }
}
exports.NodeCryptoService = NodeCryptoService;
//# sourceMappingURL=NodeCryptoService.js.map