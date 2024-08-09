import { Router } from "express";
import {
  createProductController,
  editProduct,
  getAllProductsController,
  getProductByID,
  getProductController,
} from "../controllers/productController";

const router = Router();

router.get("/products", getAllProductsController);
router.post("/products/new", createProductController);
router.get("/products/:id", getProductController);
router.get("/products/single/:id", getProductByID);
router.put("/products/edit", editProduct);

export default router;
