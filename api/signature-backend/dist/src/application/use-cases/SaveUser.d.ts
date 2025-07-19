import { UserRepository } from "../../domain/repositories/UserRepository";
import { OAuthUser } from "../../domain/models/User";
export declare class SaveUser {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    execute(user: OAuthUser): Promise<OAuthUser>;
}
