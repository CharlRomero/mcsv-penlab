import express, { Router } from "express";
import cors from "cors";
import registerRoutes from "../routes/index.routes.js";
import { CLIENT_ORIGIN } from "../config/env.config.js"; // Importar la variable


const app = express();

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true })); // Usar la variable
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRoutes);

export default app;
