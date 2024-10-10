// auth.middleware.js
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { getUserById } from '../service/user.service.js'; // Asegúrate de tener esta función implementada correctamente

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKeyHere";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verifica el token y extrae el userId
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken); // Para ver el contenido del token

    // Buscar el usuario en la base de datos utilizando el userId del token
    const user = await getUserById(decodedToken.userId); 
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar si el rol_id es 2 (estudiante)
    if (user.rol_id !== 2) {
      return res.status(403).json({ message: 'Access denied: Only students can generate certificates' });
    }

    req.user = user; // Adjunta el usuario al request para el siguiente middleware o controlador

    next(); // Pasa al siguiente middleware o controlador si todo es correcto
  } catch (error) {
    console.error(error); // Para ver errores adicionales
    return res.status(403).json({ message: 'Token is not valid' });
  }
};
