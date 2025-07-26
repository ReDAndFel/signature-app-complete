import { Router } from "express";
import { authMiddleware, sharedFileController } from "../../../container";

const router = Router();

router.post("", authMiddleware, sharedFileController.share);

router.post("/multiple", authMiddleware, sharedFileController.shareWithMultipleUsers);

router.delete("", authMiddleware, sharedFileController.revoke);

export default router;
