import { Router } from "express";
import { fileController } from "../../../container";
import multer from "multer";

const upload = multer({ dest: 'uploads/' }); 

const router = Router();

router.post('/upload', upload.single('file'), fileController.upload);
router.get('/:id', fileController.getById);

export default router;