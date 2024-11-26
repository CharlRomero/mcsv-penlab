import express from 'express';
import { LabController } from '../controller/lab.controller.js';

const router = express.Router();

router.get('/', LabController.getAllLabs);
router.post('/', LabController.createLab);

export default router;
