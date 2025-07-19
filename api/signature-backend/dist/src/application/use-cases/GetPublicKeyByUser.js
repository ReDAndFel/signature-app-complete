"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPublicKeyByUser = void 0;
class GetPublicKeyByUser {
    keyRepo;
    constructor(keyRepo) {
        this.keyRepo = keyRepo;
    }
    async execute(userId) {
        const keyPair = await this.keyRepo.getPuyblicKeyByUserId(userId);
        if (!keyPair)
            return null;
        return keyPair;
    }
}
exports.GetPublicKeyByUser = GetPublicKeyByUser;
//# sourceMappingURL=GetPublicKeyByUser.js.map