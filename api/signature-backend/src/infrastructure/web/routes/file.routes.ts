import { Router } from "express";
import { fileController } from "../../../container";
import multer from "multer";

const upload = multer({ dest: 'uploads/' }); 

const router = Router();

router.post('', upload.single('file'), fileController.upload);
router.get('/:id', fileController.getById);
router.put('/:id', fileController.sign);
router.post('/:id', fileController.verify);

export default router;