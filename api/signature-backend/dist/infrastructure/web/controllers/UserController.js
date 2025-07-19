"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    userCaseGetUserByEmail;
    userCaseGetUserById;
    constructor(userCaseGetUserByEmail, userCaseGetUserById) {
        this.userCaseGetUserByEmail = userCaseGetUserByEmail;
        this.userCaseGetUserById = userCaseGetUserById;
    }
    async getUserByEmail(req, res) {
        const user = await this.userCaseGetUserByEmail.execute(req.params.email);
        res.json({ user });
    }
    async getUserById(req, res) {
        const user = await this.userCaseGetUserById.execute(+req.params.id);
        res.json({ user });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map