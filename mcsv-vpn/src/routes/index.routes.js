// index.routes.js
import { Router } from "express";
import vpnRoutes from "./vpn.routes.js";

const router = Router();

router.use("/vpn", vpnRoutes);

export default router;