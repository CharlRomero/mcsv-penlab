// user.routes.js
import { Router } from "express";
import { loginController } from "../controller/user.controller.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js"; 

const router = Router();

router.post("/auth", loginController); // This will handle login requests
router.get("/admin", authorizeRoles("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, Admin!" });
});
router.get("/user", authorizeRoles("user", "admin"), (req, res) => {
  res.status(200).json({ message: "Welcome, User!" });
});

export default router;
