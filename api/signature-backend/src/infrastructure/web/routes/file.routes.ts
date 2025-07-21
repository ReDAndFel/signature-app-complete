import { Router } from "express";
import { authMiddleware, fileController, signFileController } from "../../../container";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/'); // carpeta de destino
  },
  filename: (_req, file, cb) => {
    // Usa el nombre original
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });


const router = Router();

router.post('', authMiddleware, upload.single('file'), fileController.upload);
router.get('/:id', authMiddleware, fileController.getById);
router.post('/signature/:id', authMiddleware, upload.single('file'), signFileController.sign);
router.post('/:id', authMiddleware, signFileController.verify);
router.get('/signature/:id', authMiddleware, signFileController.getSignature);
router.get('/signature/file/:id', authMiddleware, signFileController.listSignaturesByFile);
router.get('/signature/user', authMiddleware, signFileController.listSignaturesByUser);

export default router;