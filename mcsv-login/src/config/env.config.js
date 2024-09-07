import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
//DB User
export const DB_HOST_USER = process.env.DB_HOST_USER;
export const DB_PORT_USER = process.env.DB_PORT_USER;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD_USER = process.env.DB_PASSWORD_USER;
export const DATABASE_USER = process.env.DATABASE_USER;
//DB Token
export const DB_HOST_TOKEN = process.env.DB_HOST_TOKEN;
export const DB_PORT_TOKEN = process.env.DB_PORT_TOKEN;
export const DB_USER_TOKEN = process.env.DB_USER_TOKEN;
export const DB_PASSWORD_TOKEN = process.env.DB_PASSWORD_TOKEN;
export const DATABASE_TOKEN = process.env.DATABASE_TOKEN;