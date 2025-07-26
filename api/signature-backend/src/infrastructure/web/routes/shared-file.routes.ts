import { Router } from "express";
import { authMiddleware, sharedFileController } from "../../../container";

const router = Router();

router.post("", authMiddleware, sharedFileController.share);

router.delete("", authMiddleware, sharedFileController.revoke);

export default router;
