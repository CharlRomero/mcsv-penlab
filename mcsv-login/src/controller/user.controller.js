// user.controller.js
import { verifyUserPassword } from "../service/user.service.js";
import jwt from "jsonwebtoken"; // Para generar el token
import { saveToken } from "../model/token.model.js"; // Para guardar el token
import { getUserIdByUsername } from "../model/user.model.js"; // Asegúrate de importar correctamente la función
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
      const userId = await getUserIdByUsername(username); // Ya importado correctamente desde user.model.js
      const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });
      
      // Guardar el token en la base de datos
      const expirationDate = new Date(Date.now() + 3600000); // Expira en 1 hora
      await saveToken(userId, token, expirationDate);

      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
