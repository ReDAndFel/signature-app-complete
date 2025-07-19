import { Router } from "express";
import { authMiddleware, keyController } from "../../../container";

const router = Router();

router.post("", authMiddleware, keyController.generate);
router.post("/query", authMiddleware, keyController.getByAlias);

export default router;
