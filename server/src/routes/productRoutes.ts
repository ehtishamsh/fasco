import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getProductController,
} from "../controllers/productController";

const router = Router();

router.get("/products", getAllProductsController);
router.post("/products/new", createProductController);
router.get("/products/:id", getProductController);

export default router;
