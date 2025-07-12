import { Router } from "express";
import { keyController } from "../../../container";

const router = Router();

router.post("", keyController.generate);
router.get("", keyController.getByAlias);

export default router;
