// user.routes.js
import { Router } from "express";
import { loginController } from "../controller/user.controller.js";

const router = Router();

router.post("/auth", loginController); // This will handle login requests


export default router;