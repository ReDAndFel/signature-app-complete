import { Router } from "express";
import passport from "passport";
import { oAuthController } from "../../../container";

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

export default router;
