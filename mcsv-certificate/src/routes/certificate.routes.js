import { Router } from "express";
import { generateCertificateHandler } from "../controller/certificate.controller.js";

const router = Router();

router.post("/generate", generateCertificateHandler);

export default router;
