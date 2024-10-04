// vpnController.js
import { validateUserInput } from '../utils/validation.utils.js';
import { createVpnService } from '../service/vpn.service.js';

export const createVpn = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validar entrada
    validateUserInput(username, password);

     // Llamar al servicio para crear la VPN
    const result = await createVpnService(username, password);

    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
