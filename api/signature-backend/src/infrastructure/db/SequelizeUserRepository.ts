import { OAuthUser } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { SequelizeUserModel } from "./models/index";
import { Op } from "sequelize";

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

  async listUsers(page: number = 1, limit: number = 5, search?: string, excludeUserId?: number): Promise<{ users: OAuthUser[], total: number }> {
    const offset = (page - 1) * limit;
    
    let whereClause: any = {};
    
    // Exclude specific user if provided
    if (excludeUserId) {
      whereClause.id = { [Op.ne]: excludeUserId };
    }
    
    if (search) {
      // Simple search implementation
      const searchCondition = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      };
      
      // Combine exclude condition with search condition
      if (excludeUserId) {
        whereClause = {
          [Op.and]: [
            { id: { [Op.ne]: excludeUserId } },
            searchCondition
          ]
        };
      } else {
        whereClause = searchCondition;
      }
    }

    const { count, rows } = await SequelizeUserModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['name', 'ASC']]
    });

    const users = rows.map((user: any) => new OAuthUser(
      user.name,
      user.email,
      user.oauthProvider,
      user.oauthId,
      user.avatarUrl,
      user.id
    ));

    return { users, total: count };
  }
}
