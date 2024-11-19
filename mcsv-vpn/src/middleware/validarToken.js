import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config.js';
import { getTokenFromDB } from '../service/token.service.js';

export const validarToken = async (req, res, next) => {
  //const token = req.cookies.token; // Leer el token desde las cookies
  const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(" ")[1]; 
  
  console.log('authHeader', authHeader);
  console.log('Token recibido:', token);


   


 
  console.log('req.cookies', req.cookies);
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
  
};
