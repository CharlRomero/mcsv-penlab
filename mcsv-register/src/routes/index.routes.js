import { Router } from "express";
import studentRoutes from "./student.routes.js";

const router = Router();

router.use("/student", studentRoutes);

export default router;
