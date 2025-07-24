import { Router } from "express";
import passport from "passport";
import { authMiddleware, oAuthController } from "../../../container";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  oAuthController.handleOAuthCallback
);

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    if (req.userInfo) {
      res.json({
        id: req.userInfo.id,
        name: req.userInfo.name,
        email: req.userInfo.email,
        avatarUrl: req.userInfo.avatarUrl
      });
    } else {
      res.status(401).json({ message: "User information not available" });
    }
  }
);

router.post(
  "/logout",
  (_req: any, res: any) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });
    res.json({ message: "Logged out successfully" });
  }
);


export default router;
