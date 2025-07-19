"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthController = void 0;
const User_1 = require("../../../domain/models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class OAuthController {
    saveUser;
    jwtService;
    constructor(saveUser, jwtService) {
        this.saveUser = saveUser;
        this.jwtService = jwtService;
    }
    handleOAuthCallback = async (req, res) => {
        const user = req.user;
        if (!user || !user.email) {
            return res.status(400).json({ message: "OAuth callback failed" });
        }
        const existingUser = await this.saveUser.execute(new User_1.OAuthUser(user.name, user.email, "Google", user.oauthId, user.avatarUrl));
        if (!existingUser?.id) {
            return res.status(500).json({ message: "User ID not generated" });
        }
        const accessToken = this.jwtService.generate({
            sub: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            avatarUrl: existingUser.avatarUrl,
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.redirect(`${process.env.URL_REDIRECT_FRONT}`);
    };
}
exports.OAuthController = OAuthController;
//# sourceMappingURL=OAuthController.js.map