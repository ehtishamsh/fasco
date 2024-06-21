import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController";

const router = Router();

router.get("/products", getAllProducts);
router.post("/products/new", createProduct);
router.get("/products/:id", getProduct);

export default router;
