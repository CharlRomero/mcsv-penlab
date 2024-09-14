import { verifyUserPassword } from "../service/user.service.js";
import jwt from "jsonwebtoken"; // Para generar el token
import { saveToken } from "../model/token.model.js"; // Para guardar el token
import { getUserIdByUsername } from "../model/user.model.js"; // Asegúrate de importar correctamente la función
import logger from "../utils/logger.js"; // Importa el logger
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secretKey"; // Llave secreta para firmar el JWT
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || "1h"; // Tiempo de expiración del token

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const isValid = await verifyUserPassword(username, password);

    if (isValid) {
      // Crear el token
      const userId = await getUserIdByUsername(username);
      const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
      
      // Guardar el token en la base de datos
      const expirationDate = new Date(Date.now() + 3600000); // Expira en 1 hora
      await saveToken(userId, token, expirationDate);

      // Registrar la actividad en el log
      logger.info(`Usuario ${username} inició sesión exitosamente. Token: ${token}`);

      res.status(200).json({ message: "Login successful", token });
    } else {
      logger.warn(`Intento de inicio de sesión fallido para usuario: ${username}`);
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    logger.error(`Error en el inicio de sesión para usuario ${username}: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};