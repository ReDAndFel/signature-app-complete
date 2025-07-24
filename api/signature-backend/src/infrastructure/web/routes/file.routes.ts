import { Router } from "express";
import { authMiddleware, fileController } from "../../../container";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/"); // carpeta de destino
  },
  filename: (_req, file, cb) => {
    // Usa el nombre original
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

router.post("", authMiddleware, upload.single("file"), fileController.upload);
router.get("/user", authMiddleware, fileController.listByUserId);
router.get("/:id", authMiddleware, fileController.getById);

export default router;
