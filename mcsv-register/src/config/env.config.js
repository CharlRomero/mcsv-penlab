import dotenv from "dotenv";
dotenv.config();

//Microservice port
export const PORT = process.env.PORT;
//DB User
export const DB_HOST_USER = process.env.DB_HOST_USER;
export const DB_PORT_USER = process.env.DB_PORT_USER;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD_USER = process.env.DB_PASSWORD_USER;
export const DATABASE_USER = process.env.DATABASE_USER;

export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN; // Nueva variable cors
