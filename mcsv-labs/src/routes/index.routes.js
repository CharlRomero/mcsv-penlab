// index.routes.js
import { Router } from "express";
import userRoutes from "./flag.routes.js";
import labsRoutes from "./lab.routes.js"




const router = Router();

router.use("/labs", labsRoutes);
router.use("/flags", userRoutes);
export default router;