import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";

export class ListUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(page: number = 1, limit: number = 5, search?: string, excludeUserId?: number): Promise<{ users: User[], total: number }> {
    return await this.userRepository.listUsers(page, limit, search, excludeUserId);
  }
}
