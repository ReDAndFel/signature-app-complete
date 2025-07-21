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
    res.json({ userId: req.userId });
  }
);


export default router;
