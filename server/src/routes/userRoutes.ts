import { Router } from "express";
import { register } from "../controllers/RegisterController";
const router = Router();

router.post("/api/register", register);

export default router;
