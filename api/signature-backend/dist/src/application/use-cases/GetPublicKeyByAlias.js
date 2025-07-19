"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPublicKeyByAlias = void 0;
class GetPublicKeyByAlias {
    keyRepo;
    constructor(keyRepo) {
        this.keyRepo = keyRepo;
    }
    async execute(alias) {
        const keyPair = await this.keyRepo.getPublicKey(alias);
        if (!keyPair)
            return null;
        return keyPair;
    }
}
exports.GetPublicKeyByAlias = GetPublicKeyByAlias;
//# sourceMappingURL=GetPublicKeyByAlias.js.map