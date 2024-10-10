// vpnController.js
import { validateUserInput } from '../utils/validation.utils.js';
import { createVpnService } from '../service/vpn.service.js';

export const createVpn = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Log para verificar la entrada
    console.log(`Username: ${username}, Password: ${password}, token: ${req.cookies.token}`);
    //    console.log(`Username: ${username}, Password: ${password}, token: ${req.cookies.token}`);



    // Validar entrada
    // validateUserInput(username, password);

    const result = await createVpnService(username, password);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
