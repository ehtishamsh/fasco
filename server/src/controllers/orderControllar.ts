import { Request, Response } from "express";
import {
  checkExistingOrder,
  checkOrderItems,
  createOrderItems,
  createOrder,
} from "../services/Order";
interface OrderData {
  addressId: string;
  userId: string;
  payment_intentId: string;
  payment_status: string;
  products: Product[];
}
interface Product {
  id: string;
  title: string;
  price: string;
  stock: number;
  variants: [
    {
      id: string;
      name: string;
      price: string;
    }
  ];
  colors: [
    {
      id: string;
      name: string;
    }
  ];

  description: string;
  category: string;
  brand: string;
  cover: string;
  screenSize: string;
  cpu: string;
  cores: string;
  mainCamera: string;
  frontCamera?: string;
  battery: string;
  ram: string;
  quantity?: number;
  slug: string;
  selectedVariant?: {
    id: string;
    name: string;
    price: string;
  };
  selectedColor?: {
    id: string;
    name: string;
  };
}
export async function createOrderController(req: Request, res: Response) {
  const data: OrderData = req.body;

  try {
    const checkifOrderExists = await checkExistingOrder(data.payment_intentId);
    if (checkifOrderExists) {
      const orderItems = await checkOrderItems(checkifOrderExists.id);
      if (orderItems.length > 0) {
        return res.status(400).json({ message: "Order already exists" });
      }

      return res.status(400).json({ message: "Order Already exists" });
    }

    const total = data.products.reduce((acc, product) => {
      const productTotal =
        (Number(product.price) + Number(product.selectedVariant?.price || 0)) *
        Number(product.quantity);
      return acc + productTotal;
    }, 0);
    const order = await createOrder(data, total);
    if (!order) {
      return res.status(400).json({ message: "Error creating order" });
    }

    const orderItems = await createOrderItems(order.id, data.products);
    if (!orderItems) {
      return res.status(400).json({ message: "Error creating order items" });
    }

    return res.status(200).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
