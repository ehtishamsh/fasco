import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByID,
  getProductController,
} from "../controllers/productController";

const router = Router();

router.get("/products", getAllProductsController);
router.post("/products/new", createProductController);
router.get("/products/:id", getProductController);
router.get("/products/edit/:id", getProductByID);

export default router;
