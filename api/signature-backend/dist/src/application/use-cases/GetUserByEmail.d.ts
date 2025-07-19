import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";
export declare class GetUserByEmail {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(email: string): Promise<User | null>;
}
