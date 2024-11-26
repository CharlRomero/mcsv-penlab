import { createPool } from "mysql2/promise";
import {
  DB_HOST_VULNERABLE,
  DB_PORT_VULNERABLE,
  DB_USER_VULNERABLE,
  DB_PASSWORD_VULNERABLE,
  DATABASE_VULNERABLE,
} from "../env.config.js"; // Importamos las variables desde el archivo de entorno

export const vulnerablePool = createPool({
  host: DB_HOST_VULNERABLE,
  port: DB_PORT_VULNERABLE,
  user: DB_USER_VULNERABLE,
  password: DB_PASSWORD_VULNERABLE,
  database: DATABASE_VULNERABLE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
