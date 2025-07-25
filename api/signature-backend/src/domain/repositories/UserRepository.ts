import { OAuthUser } from "../models/User";

export interface UserRepository {
  saveUser(user: OAuthUser): Promise<OAuthUser>;
  getUserById(id: number): Promise<OAuthUser | null>;
  getUserByEmail(email: string): Promise<OAuthUser | null>;
  listUsers(page: number, limit: number, search?: string, excludeUserId?: number): Promise<{ users: OAuthUser[], total: number }>;
}
