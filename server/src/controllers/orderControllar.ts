import {
  getAllOrdersService,
  getOrderById as get,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/Order";
import prisma from "../utils/db";

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

const createNewOrder = async (req: any, res: any) => {
  const {
    orderNumber,
    status,
    total,
    userId,
    addressId,
    orderConfirmation,
    shipping,
    toDeliver,
    cod,
    product,
  } = req.body;
  console.log(req.body);
  try {
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        status,
        total,
        userId,
        addressId,
        orderConfirmation,
        shipping,
        toDeliver,
        cod,
      },
    });
    console.log(newOrder);
    if (newOrder) {
      const orderitem = await Promise.all(
        product.map(async (item: any) => {
          return await prisma.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              variantId: item.variantId,
              colorID: item.colorID,
              quantity: item.quantity,
              price: item.price,
              total: newOrder.total,
            },
          });
        })
      );
      if (orderitem.length > 0) {
        res.status(201).json({
          message: "Order created successfully",
          newOrder,
          orderitem,
        });
      } else {
        res.status(500).json({ error: "Failed to create order" });
      }
    } else {
      res.status(500).json({ error: "Failed to create order" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
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
