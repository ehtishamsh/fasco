import { Router } from "express";
import { createOrderController } from "../controllers/orderControllar";

const router = Router();

router.post("/order/create", createOrderController);
export default router;
