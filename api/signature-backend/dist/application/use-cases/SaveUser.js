"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveUser = void 0;
class SaveUser {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(user) {
        return await this.userRepo.saveUser(user);
    }
}
exports.SaveUser = SaveUser;
//# sourceMappingURL=SaveUser.js.map