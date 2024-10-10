import express, { Router } from "express";
import cors from "cors";
import loginRoutes from "../routes/index.routes.js";

const app = express();

app.use(cors({ origin: "http://192.168.10.246:8080", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRoutes);

export default app;