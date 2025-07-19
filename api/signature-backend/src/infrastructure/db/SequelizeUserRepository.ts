import { OAuthUser } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { SequelizeUserModel } from "./models/index";

export class SequelizeUserRepository implements UserRepository {
  async saveUser(user: OAuthUser): Promise<OAuthUser> {
    try {
      const existing = await SequelizeUserModel.findOne({
        where: { email: user.email },
      });

      if (existing) {
        existing.name = user.name;
        existing.avatarUrl = user.avatarUrl;
        await existing.save(); 
        return existing.toJSON() as OAuthUser;
      }

      const created = await SequelizeUserModel.create({
        name: user.name,
        email: user.email,
        oauthProvider: user.oauthProvider,
        oauthId: user.oauthId,
        avatarUrl: user.avatarUrl,
      });

      return created.toJSON() as OAuthUser;
    } catch (err) {
      throw err;
    }
  }

  async getUserById(id: number): Promise<OAuthUser | null> {
    const user = await SequelizeUserModel.findByPk(id);
    return user
      ? new OAuthUser(
          user.name,
          user.email,
          user.oauthProvider,
          user.oauthId,
          user.avatarUrl,
          user.id
        )
      : null;
  }

  async getUserByEmail(email: string): Promise<OAuthUser | null> {
    const user = await SequelizeUserModel.findOne({ where: { email } });
    return user
      ? new OAuthUser(
          user.name,
          user.email,
          user.oauthProvider,
          user.oauthId,
          user.avatarUrl,
          user.id
        )
      : null;
  }
}
