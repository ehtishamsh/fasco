import { Router } from "express";
import {
  createOrderController,
  getUserOrdersController,
} from "../controllers/orderControllar";

const router = Router();

router.post("/order/create", createOrderController);
router.get("/order/user/:id", getUserOrdersController);
export default router;
