import { Router } from "express";
import {
  allorders,
  createNewOrder,
  deleteExistingOrder,
  orderbyid,
  updateExistingOrder,
} from "../controllers/orderControllar";

const router = Router();

router.get("/orders", allorders);
router.get("/orders/:id", orderbyid);
router.post("/orders/new", createNewOrder);
router.put("/order/edit/:id", updateExistingOrder);
router.delete("/order/delete/:id", deleteExistingOrder);
export default router;
