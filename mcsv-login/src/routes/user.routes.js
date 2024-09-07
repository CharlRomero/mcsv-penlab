import { Router } from "express";
import { selectController } from "../controller/user.controller.js";

const router = Router();

router.get("/info", selectController);

export default router;
