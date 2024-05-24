import { Router } from "express";
import { loginController } from "../controllers/loginController";

const router = Router();

router.post("/auth/login", loginController);
router.post("/auth/register");

export default router;
