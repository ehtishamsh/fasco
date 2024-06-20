import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController";

const router = Router();

router.get("/products", getAllProducts);
router.post("/products/new", createProduct);

export default router;
