import express, { Router } from "express";
import cors from "cors";
import loginRoutes from "../routes/index.routes.js";

const app = express();

app.use(cors({ origin: "http://192.168.10.239:8082", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRoutes);

export default app;