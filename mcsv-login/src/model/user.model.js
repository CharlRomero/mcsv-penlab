import { userPool } from "../config/database.config.js";

export const select = async () => {
  const [rows] = await userPool.query("select * from user");
  return rows[0];
};
