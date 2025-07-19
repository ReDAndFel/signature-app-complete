import { OAuthUser } from "../../domain/models/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
export declare class SequelizeUserRepository implements UserRepository {
    saveUser(user: OAuthUser): Promise<OAuthUser>;
    getUserById(id: number): Promise<OAuthUser | null>;
    getUserByEmail(email: string): Promise<OAuthUser | null>;
}
