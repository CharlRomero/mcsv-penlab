// certificate.routes.js
import { Router } from 'express';
import { generateCertificateHandler } from '../controller/certificate.controller.js';
import { authenticateToken } from '../utils/auth.middleware.js'; // Importa el middleware

const router = Router();

router.post('/generate', authenticateToken, generateCertificateHandler); // Protege la ruta

export default router;
