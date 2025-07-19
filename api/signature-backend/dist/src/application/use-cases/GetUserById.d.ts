import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";
export declare class GetUserById {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(id: number): Promise<User | null>;
}
