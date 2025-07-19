"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthUser = exports.User = void 0;
class User {
    name;
    email;
    id;
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
}
exports.User = User;
class OAuthUser extends User {
    oauthProvider;
    oauthId;
    avatarUrl;
    constructor(name, email, oauthProvider, oauthId, avatarUrl, id) {
        super(name, email, id);
        this.oauthProvider = oauthProvider;
        this.oauthId = oauthId;
        this.avatarUrl = avatarUrl;
    }
}
exports.OAuthUser = OAuthUser;
//# sourceMappingURL=User.js.map