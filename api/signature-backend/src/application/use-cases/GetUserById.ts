import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";

export class GetUserById {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepo.getUserById(id);
  }
}
