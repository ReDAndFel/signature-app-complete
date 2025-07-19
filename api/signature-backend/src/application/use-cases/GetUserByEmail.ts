import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";

export class GetUserByEmail {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    return this.userRepo.getUserByEmail(email);
  }
}
