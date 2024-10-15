import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { getUserById } from '../service/user.service.js';

dotenv.config();

//validar cuando el token es invalido
const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

export const authenticateToken = async (req, res, next) => {
  // Obtén el token desde las cookies
  const token = req.cookies.token;
  console.log('Token:', token);
  // Si no hay token, se devuelve un error
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verifica el token con la clave secreta del MCSV-LOGIN
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Busca el usuario en la base de datos utilizando el userId del token
    const user = await getUserById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifica si el rol_id es 2 (estudiante)
    if (user.rol_id !== 2) {
      return res.status(403).json({ message: 'Access denied: Only students can generate certificates' });
    }

    // Adjunta el usuario al request para el siguiente middleware o controlador
    req.user = user;

    next(); // Pasa al siguiente middleware o controlador si todo es correcto
  } catch (error) {
    // Si el token no es válido, se devuelve un error
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
