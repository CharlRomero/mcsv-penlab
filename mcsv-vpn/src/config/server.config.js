import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Asegúrate de importar cookie-parser
import vpnRoutes from "../routes/index.routes.js";

const app = express();

app.use(cors({ origin: "http://192.168.10.101:8080", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Añadir el middleware aquí

app.use("/mcsv", vpnRoutes);

export default app;
