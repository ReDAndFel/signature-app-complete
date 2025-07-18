import { UserRepository } from "../../domain/repositories/UserRepository";
import { OAuthUser, User } from "../../domain/models/User";

export class GetUserByEmail {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(email: string): Promise<OAuthUser | null> {
    return this.userRepo.getUserByEmail(email);
  }
}
