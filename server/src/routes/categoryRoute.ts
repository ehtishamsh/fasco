import { Router } from "express";
import {
  getAllCategories,
  createCategory,
} from "../controllers/categoryController";
const router = Router();
router.get("/api/categories", getAllCategories);
router.post("/api/category", createCategory);

export default router;
