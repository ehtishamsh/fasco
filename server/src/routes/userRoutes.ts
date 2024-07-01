import { Router } from "express";
import { register } from "../controllers/RegisterController";
import { login } from "../controllers/loginController";
import { updateUser } from "../controllers/userController";
const router = Router();

router.post("/api/login", login);
router.post("/api/register", register);
router.put("/api/user/update", updateUser);
export default router;
