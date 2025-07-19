import { Request, Response } from "express";
import { SaveUser } from "../../../application/use-cases/SaveUser";
import { JwtService } from "../../security/JwtService";
import { OAuthUser } from "../../../domain/models/User";

import dotenv from "dotenv";

dotenv.config();

export class OAuthController {
  constructor(
    private readonly saveUser: SaveUser,
    private readonly jwtService: JwtService
  ) {}

  handleOAuthCallback = async (req: Request, res: Response) => {
    console.log('OAuth callback initiated');
    const user = req.user as OAuthUser;
    console.log('User from OAuth:', user);
    
    if (!user || !user.email) {
      console.log('OAuth callback failed - no user or email');
      return res.status(400).json({ message: "OAuth callback failed" });
    }

    console.log('Saving user to database...');
    const existingUser = await this.saveUser.execute(
      new OAuthUser(
        user.name,
        user.email,
        "Google",
        user.oauthId,
        user.avatarUrl
      )
    );

    if (!existingUser?.id) {
      console.log('User ID not generated');
      return res.status(500).json({ message: "User ID not generated" });
    }

    console.log('Generating JWT token...');
    const accessToken = this.jwtService.generate({
      sub: existingUser.id.toString(),
      name: existingUser.name,
      email: existingUser.email,
      avatarUrl: (existingUser as any).avatarUrl,
    });

    console.log('Setting cookie with token...');
    res.cookie("accessToken", accessToken, {
      httpOnly: false,  // Permitir acceso desde JavaScript
      secure: true,
      sameSite: "none",
      maxAge: 3600000, // 1 hora
      path: "/"
    });

    console.log('Redirecting to:', process.env.URL_REDIRECT_FRONT);
    res.redirect(`${process.env.URL_REDIRECT_FRONT}`);
  };
}
