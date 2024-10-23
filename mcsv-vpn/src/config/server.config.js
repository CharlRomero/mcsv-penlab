import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Asegúrate de importar cookie-parser
import vpnRoutes from "../routes/index.routes.js";
import { CLIENT_ORIGIN } from "../config/env.config.js"; // Importar la variable

const app = express();

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true })); // Usar la variable
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Añadir el middleware aquí

app.use("/mcsv", vpnRoutes);

export default app;
