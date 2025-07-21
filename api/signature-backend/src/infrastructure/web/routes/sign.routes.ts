import { Router } from "express";
import { authMiddleware, signFileController } from "../../../container";
import multer from "multer";

const router = Router();

const memoryUpload = multer({ storage: multer.memoryStorage() });

router.post(
  "/signature/:id",
  authMiddleware,
  memoryUpload.single("file"),
  signFileController.sign
);

router.post("/verify-signature/:id", authMiddleware, signFileController.verify);

router.get("/signature/:id", authMiddleware, signFileController.getSignature);

router.get(
  "/signature/file/:id",
  authMiddleware,
  signFileController.listSignaturesByFile
);

router.get(
  "/signature/user",
  authMiddleware,
  signFileController.listSignaturesByUser
);

export default router;
