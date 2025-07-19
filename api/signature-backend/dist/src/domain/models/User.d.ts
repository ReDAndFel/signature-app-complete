export declare class User {
    name: string;
    email: string;
    id?: number | undefined;
    constructor(name: string, email: string, id?: number | undefined);
}
export declare class OAuthUser extends User {
    oauthProvider: string;
    oauthId: string;
    avatarUrl: string;
    constructor(name: string, email: string, oauthProvider: string, oauthId: string, avatarUrl: string, id?: number);
}
