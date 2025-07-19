"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmail = void 0;
class GetUserByEmail {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email) {
        return this.userRepo.getUserByEmail(email);
    }
}
exports.GetUserByEmail = GetUserByEmail;
//# sourceMappingURL=GetUserByEmail.js.map