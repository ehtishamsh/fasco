import { Router } from "express";
import { register } from "../controllers/RegisterController";
import { login } from "../controllers/loginController";
const router = Router();

router.post("/api/login", login);
router.post("/api/register", register);

export default router;
