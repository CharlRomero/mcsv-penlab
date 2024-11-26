import express from 'express';
import { FlagController } from '../controller/flag.controller.js';

const router = express.Router();

router.get('/:labId', FlagController.getFlagsByLab);
router.post('/validate/:flagId', FlagController.validateAndCreateFlag);

export default router;
