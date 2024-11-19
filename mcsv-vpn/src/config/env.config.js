import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const COMMAND = process.env.COMMAND;
export const SSH_PORT = process.env.SSH_PORT;
export const SSH_PASSWORD = process.env.SSH_PASSWORD;
export const REMOTE_HOST = process.env.REMOTE_HOST;// ip de la maquina virtual penlab
export const REMOTE_USER = process.env.REMOTE_USER;
export const REMOTE_PATH = process.env.REMOTE_PATH;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN; // Nueva variable cors ip del front
//base de datos
// Agrega la exportación de DB_HOST_USER si está definida en el .env
export const DB_HOST_USER = process.env.DB_HOST_USER; // Añadido aquí
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD_USER = process.env.DB_PASSWORD_USER;
export const DATABASE_USER = process.env.DATABASE_USER; // Ya agregado previamente
export const JWT_SECRET = process.env.JWT_SECRET; 
