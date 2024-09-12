import { tokenPool } from "../config/database.config.js";

// Función para guardar el token en la base de datos
export const saveToken = async (userId, token, expiresAt) => {
  const query = `INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)`;
  const [result] = await tokenPool.query(query, [userId, token, expiresAt]);
  return result;
};