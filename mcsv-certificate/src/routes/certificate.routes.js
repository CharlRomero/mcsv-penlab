// certificate.routes.js
import { Router } from 'express';
import { generateCertificateHandler } from '../controller/certificate.controller.js';
import { downloadCertificateHandler } from '../controller/certificate.controller.js'; // Importa el controlador
import { authenticateToken } from '../utils/auth.middleware.js'; // Importa el middleware

const router = Router();

router.post('/generate', generateCertificateHandler); // Protege la ruta
//agregar el de descarga


// Ruta para generar el certificado
router.post('/generate', generateCertificateHandler);

// Ruta para descargar el certificado
router.get('/download/:username', downloadCertificateHandler); // Agrega esta ruta

export default router;