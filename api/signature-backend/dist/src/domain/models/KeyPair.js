"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = void 0;
class KeyPair {
    alias;
    publicKey;
    userId;
    id;
    constructor(alias, publicKey, userId, id) {
        this.alias = alias;
        this.publicKey = publicKey;
        this.userId = userId;
        this.id = id;
    }
}
exports.KeyPair = KeyPair;
//# sourceMappingURL=KeyPair.js.map