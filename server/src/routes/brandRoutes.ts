import { Router } from "express";
import { Create, GetAll } from "../controllers/brandController";

const router = Router();

router.get("/brands", GetAll);
router.post("/brands/new", Create);

export default router;
