import { Router } from "express";
import certificateRoutes from "./certificate.routes.js";

const router = Router();

router.use("/certificate", certificateRoutes);

export default router;
