// user.service.js
import { pool } from '../config/database.js'; // Asumiendo que tienes configurada tu conexión a la BD

export const getUserById = async (userId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    return rows[0]; // Retorna el usuario si lo encuentra
  } catch (error) {
    console.error(error);
    throw new Error('Database query failed');
  }
};
