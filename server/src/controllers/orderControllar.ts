import {
  getAllOrdersService,
  getOrderById as get,
  updateOrder,
  createNewOrder as createNewOrderService,
  deleteOrder,
} from "../services/Order";
import prisma from "../utils/db";
import { Request, Response } from "express";

const allorders = async (req: any, res: any) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const orderbyid = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const order = await get(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const createNewOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const { newOrder, orderItems } = await createNewOrderService(orderData);

    if (newOrder && orderItems.length > 0) {
      res.status(201).json({
        message: "Order created successfully",
        newOrder,
        orderItems,
      });
    } else {
      res.status(500).json({ error: "Failed to create order" });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const updateExistingOrder = async (req: any, res: any) => {
  const { id } = req.params;
  const orderData = req.body;
  try {
    const updatedOrder = await updateOrder(id, orderData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteExistingOrder = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await deleteOrder(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export {
  allorders,
  orderbyid,
  createNewOrder,
  updateExistingOrder,
  deleteExistingOrder,
};
