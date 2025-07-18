import { UserRepository } from "../../domain/repositories/UserRepository";
import { OAuthUser } from "../../domain/models/User";

export class SaveUser {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(user: OAuthUser): Promise<OAuthUser> {
    return await this.userRepo.saveUser(user);
  }
}
