import { JwtPayload } from "jsonwebtoken";
export declare class JwtService {
    generate(payload: {
        sub: string;
        name: string;
        email: string;
        avatarUrl?: string;
    }): string;
    verify(token: string): JwtPayload;
}
