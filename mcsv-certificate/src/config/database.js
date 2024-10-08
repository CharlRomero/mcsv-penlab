import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST_USER,       // Usar la variable correcta de .env
  port: process.env.DB_PORT_USER,       // Usar el puerto definido en .env
  user: process.env.DB_USER,            // Usar el usuario definido en .env
  password: process.env.DB_PASSWORD_USER, // Usar la contraseña definida en .env
  database: process.env.DATABASE_USER,  // Usar la base de datos definida en .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
