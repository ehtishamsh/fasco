import prisma from "../utils/db";

interface Product {
  productId: string;
  variantId: string;
  colorID: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderNumber: number;
  status: string[];
  total: number;
  userId: string;
  addressId: string;
  cod: boolean;

  product: Product[];
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
export const createNewOrder = async (orderData: OrderData) => {
  const { orderNumber, status, total, userId, addressId, cod, product } =
    orderData;

  const newOrder = await prisma.order.create({
    data: {
      orderNumber,
      status,
      total,
      userId,
      addressId,
      cod,
    },
  });

  const orderItems = await Promise.all(
    product.map(async (item) => {
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

  return { newOrder, orderItems };
};

export const updateOrder = async (id: string, orderData: OrderData) => {
  return await prisma.order.update({
    where: { id },
    data: orderData,
  });
};
export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
};
