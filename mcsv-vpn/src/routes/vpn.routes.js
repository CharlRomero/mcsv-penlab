import { Router } from "express";
import { createVpn } from "../controller/vpn.controller.js";
const router = Router();

router.post("/create", createVpn); // This will handle login requests


export default router;