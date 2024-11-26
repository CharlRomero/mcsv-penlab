import { createPool } from "mysql2/promise";
import {
  DB_HOST_TOKEN,
  DB_PORT_TOKEN,
  DB_USER_TOKEN,
  DB_PASSWORD_TOKEN,
  DATABASE_TOKEN,
} from "../env.config.js";

export const tokenPool = new createPool({
  host: DB_HOST_TOKEN,
  port: DB_PORT_TOKEN,
  user: DB_USER_TOKEN,
  password: DB_PASSWORD_TOKEN,
  database: DATABASE_TOKEN,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
