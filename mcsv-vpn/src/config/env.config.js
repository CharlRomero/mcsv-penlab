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
