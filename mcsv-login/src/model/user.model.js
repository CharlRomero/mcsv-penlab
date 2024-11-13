// user.model.js
import { userPool } from "../config/database.config.js";

export const getUserByUsername = async (username) => {
  const query = "SELECT password, salt, rol_id FROM user WHERE username = ?";
  const [rows] = await userPool.query(query, [username]);
  return rows[0];
};

export const getUserIdByUsername = async (username) => {
  const query = "SELECT user_id FROM user WHERE username = ?";
  const [rows] = await userPool.query(query, [username]);
  return rows[0]?.user_id;
};