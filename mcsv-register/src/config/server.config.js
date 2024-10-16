import express, { Router } from "express";
import cors from "cors";
import registerRoutes from "../routes/index.routes.js";

const app = express();

app.use(cors({ origin: "http://192.168.10.101:8080", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/register", registerRoutes);

export default app;
