import { Router } from "express";
import {
  createUserController,
  updatePasswordController,
} from "../controller/student.controller.js";

const router = Router();

router.post("/create", createUserController);
router.post("/update-password", updatePasswordController);

export default router;
