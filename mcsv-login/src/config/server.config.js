import express from "express";
import cors from "cors";
import loginRoutes from "../routes/index.routes.js";
import { CLIENT_ORIGIN } from "../config/env.config.js"; // Importar la variable

const app = express();


app.use(cors({ origin: CLIENT_ORIGIN, credentials: true })); // Usar la variable
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRoutes);

export default app;