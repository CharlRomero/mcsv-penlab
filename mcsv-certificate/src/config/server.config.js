import express from "express";
import cors from "cors";
import certificateRoutes from "../routes/index.routes.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/mcsv", certificateRoutes);

export default app;
