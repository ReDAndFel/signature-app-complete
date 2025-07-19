"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserRepository = void 0;
const User_1 = require("../../domain/models/User");
const index_1 = require("./models/index");
class SequelizeUserRepository {
    async saveUser(user) {
        try {
            const existing = await index_1.SequelizeUserModel.findOne({
                where: { email: user.email },
            });
            if (existing) {
                existing.name = user.name;
                existing.avatarUrl = user.avatarUrl;
                await existing.save();
                return existing.toJSON();
            }
            const created = await index_1.SequelizeUserModel.create({
                name: user.name,
                email: user.email,
                oauthProvider: user.oauthProvider,
                oauthId: user.oauthId,
                avatarUrl: user.avatarUrl,
            });
            return created.toJSON();
        }
        catch (err) {
            throw err;
        }
    }
    async getUserById(id) {
        const user = await index_1.SequelizeUserModel.findByPk(id);
        return user
            ? new User_1.OAuthUser(user.name, user.email, user.oauthProvider, user.oauthId, user.avatarUrl, user.id)
            : null;
    }
    async getUserByEmail(email) {
        const user = await index_1.SequelizeUserModel.findOne({ where: { email } });
        return user
            ? new User_1.OAuthUser(user.name, user.email, user.oauthProvider, user.oauthId, user.avatarUrl, user.id)
            : null;
    }
}
exports.SequelizeUserRepository = SequelizeUserRepository;
//# sourceMappingURL=SequelizeUserRepository.js.map