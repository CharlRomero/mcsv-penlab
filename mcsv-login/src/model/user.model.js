// user.model.js
import { userPool } from "../config/database.config.js";

export const getUserByUsername = async (username) => {
  const query = "SELECT password, salt FROM user WHERE username = ?";
  const [rows] = await userPool.query(query, [username]);
  return rows[0];
};