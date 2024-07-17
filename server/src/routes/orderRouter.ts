import { Router } from "express";
import {
  createOrderController,
  getUserOrdersController,
  getOrderDetail,
} from "../controllers/orderControllar";

const router = Router();

router.post("/order/create", createOrderController);
router.get("/order/user/:id", getUserOrdersController);
router.get("/order/:id", getOrderDetail);
router.put("/order/update");
export default router;
