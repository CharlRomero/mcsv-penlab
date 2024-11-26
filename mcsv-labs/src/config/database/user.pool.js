import { createPool } from "mysql2/promise";
import {
  DB_HOST_USER,
  DB_PORT_USER,
  DB_USER,
  DB_PASSWORD_USER,
  DATABASE_USER,
} from "../env.config.js";

export const userPool = new createPool({
  host: DB_HOST_USER,
  port: DB_PORT_USER,
  user: DB_USER,
  password: DB_PASSWORD_USER,
  database: DATABASE_USER,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
