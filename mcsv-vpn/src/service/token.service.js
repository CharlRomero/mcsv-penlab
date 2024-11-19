// src/service/token.service.js
import mysql from 'mysql2/promise';
import { DB_HOST_USER, DB_USER, DB_PASSWORD_USER, DATABASE_USER } from '../config/env.config.js';

// Crear una conexión a la base de datos
const connection = await mysql.createConnection({
  host: DB_HOST_USER,
  user: DB_USER,
  password: DB_PASSWORD_USER,
  database: DATABASE_USER
});

export const checkUserStatus = async (userId) => {
  const [rows] = await connection.execute(
    'SELECT user_status FROM user WHERE user_id = ?',
    [userId]
  );

  if (rows.length === 0 || !rows[0].user_status) {
    throw new Error('Usuario inactivo o no encontrado');
  }
};

export const getTokenFromDB = async (userId) => {
  try {
    const [rows] = await connection.execute(
      'SELECT token FROM tokens WHERE user_id = ? AND expires_at > NOW()',
      [userId]
    );

    if (rows.length === 0) {
      throw new Error('Token no encontrado o expirado');
    }

    return rows[0].token; // Devuelve el token válido
  } catch (error) {
    throw new Error('Error al obtener el token de la base de datos: ' + error.message);
  }
};

