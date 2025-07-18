import { Request, Response } from "express";
import { SaveUser } from "../../../application/use-cases/SaveUser";
import { GetUserByEmail } from "../../../application/use-cases/GetUserByEmail";
import { JwtService } from "../../security/JwtService";
import { OAuthUser } from "../../../domain/models/User";

import dotenv from "dotenv";

dotenv.config();

export class OAuthController {
  constructor(
    private readonly saveUser: SaveUser,
    private readonly getUserByEmail: GetUserByEmail,
    private readonly jwtService: JwtService
  ) {}

  handleOAuthCallback = async (req: Request, res: Response) => {
    const user = req.user as OAuthUser;
    if (!user || !user.email) {
      return res.status(400).json({ message: "OAuth callback failed" });
    }

    let existingUser = await this.getUserByEmail.execute(user.email);

    if (!existingUser) {
      existingUser = await this.saveUser.execute(
        new OAuthUser(
          user.name,
          user.email,
          "Google",
          user.oauthId,
          user.avatarUrl
        )
      );
    }

    const accessToken = this.jwtService.generate({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      avatarUrl: (existingUser as any).avatarUrl,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.redirect(`${process.env.URL_REDIRECT_FRONT}`);
  };
}
