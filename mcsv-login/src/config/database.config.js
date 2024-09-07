import { createPool } from "mysql2/promise";
import {
  DB_HOST_USER,
  DB_PORT_USER,
  DB_USER,
  DB_PASSWORD_USER,
  DATABASE_USER,
  DB_HOST_TOKEN,
  DB_USER_TOKEN,
  DB_PASSWORD_TOKEN,
  DATABASE_TOKEN,
} from "./env.config.js";

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

export const tokenPool = new createPool({
  host: DB_HOST_TOKEN,
  user: DB_USER_TOKEN,
  password: DB_PASSWORD_TOKEN,
  database: DATABASE_TOKEN,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
