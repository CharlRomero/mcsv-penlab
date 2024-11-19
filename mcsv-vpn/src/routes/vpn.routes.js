// src/routes/vpn.routes.js
import { Router } from 'express';
import { createVpn, downloadVpn } from '../controller/vpn.controller.js';
import { validarToken } from '../middleware/validarToken.js';

const router = Router();

// Rutas protegidas con validación de token
router.post('/create', validarToken, createVpn); // Validación de token antes de crear el VPN
router.get('/download/:username', validarToken, downloadVpn); // Validación de token antes de descargar el archivo

export default router;
