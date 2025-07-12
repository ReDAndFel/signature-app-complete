import { Router } from "express";
import { keyController } from "../../../container";

const router = Router();

router.post("/generate-key", keyController.generate);

export default router;
