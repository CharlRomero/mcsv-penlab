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

//conexion a la base de datos de la tabla de laboratorios

// Nueva conexión para la base de datos vulnerable_machines_db
export const poolVulnerableMachines = mysql.createPool({
  host: process.env.DB_HOST,  // Usa la IP del host de la DB vulnerable_machines_db
  port: process.env.DB_PORT,  // Puerto de la base de datos
  user: process.env.DB_USER_MACHINE,  // Usuario de la base de datos
  password: process.env.DB_PASSWORD_MACHINE,  // Contraseña de la base de datos
  database: "vulnerable_machines_db",  // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});