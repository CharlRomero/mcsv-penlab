import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // Importar cookie-parser
import certificateRoutes from "../routes/index.routes.js";

const app = express();

app.use(cors({ origin: "http://10.240.1.2:8080", credentials: true }));
app.use(express.json());
app.use(cookieParser()); // Usar cookie-parser para acceder a las cookies
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/mcsv", certificateRoutes);

export default app;