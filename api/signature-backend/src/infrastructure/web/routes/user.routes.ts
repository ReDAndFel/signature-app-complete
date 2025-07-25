import { Router } from "express";
import { authMiddleware, userController } from "../../../container";

const router = Router();

router.get("/list", authMiddleware, userController.listUsers);
router.get("/email/:email", authMiddleware, userController.getUserByEmail);
router.get("/id/:id", authMiddleware, userController.getUserById);

export default router;
