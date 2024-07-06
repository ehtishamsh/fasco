import prisma from "../utils/db";

export interface Order {
  id: string;
  orderNumber: number;
  status: string[];
  total: number;
  userId: string;
  addressId: string;
  orderConfirmation: boolean;
  shipping: boolean;
  toDeliver: boolean;
  cod: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  order: Order;
  productId: string;
  variantId?: string | null;
  colorID?: string | null;

  quantity: number;
  price: number;
  total: number;
}
export const getAllOrdersService = async () => {
  return await prisma.order.findMany({
    include: {
      items: true,
      user: true,
      address: true,
    },
  });
};
export const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      user: true,
      address: true,
    },
  });
};
export const createOrder = async (orderData: Order) => {
  return await prisma.order.create({
    data: orderData,
    include: {
      items: true,
      user: true,
      address: true,
    },
  });
};
export const updateOrder = async (id: string, orderData: Order) => {
  return await prisma.order.update({
    where: { id },
    data: orderData,
    include: {
      items: true,
      user: true,
      address: true,
    },
  });
};
export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
};
