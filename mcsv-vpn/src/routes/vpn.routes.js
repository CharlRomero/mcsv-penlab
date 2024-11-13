// vpn.routes.js
import { Router } from 'express';
import { createVpn, downloadVpn } from '../controller/vpn.controller.js';
const router = Router();

router.post('/create', createVpn); // Ruta para crear el VPN
router.get('/download/:username', downloadVpn); // Ruta para descargar el archivo .zip por username

export default router;
