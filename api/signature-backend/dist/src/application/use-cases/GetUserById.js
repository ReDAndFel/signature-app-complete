"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = void 0;
class GetUserById {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(id) {
        return this.userRepo.getUserById(id);
    }
}
exports.GetUserById = GetUserById;
//# sourceMappingURL=GetUserById.js.map