import prisma from "../utils/db";

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
export async function checkExistingOrder(paymentIntentId: string) {
  return await prisma.order.findFirst({
    where: {
      paymentIntentId,
    },
  });
}

export async function checkOrderItems(orderId: string) {
  return await prisma.orderItem.findMany({
    where: {
      orderId,
    },
  });
}

export async function createOrder(data: OrderData, total: number) {
  return await prisma.order.create({
    data: {
      orderNumber: Math.floor(Math.random() * 100000),
      addressId: data.addressId,
      userId: data.userId,
      amount: total,
      orderStatus: "PENDING",
      status: ["PENDING"],
      currency: "usd",
      paymentIntentId: data.payment_intentId,
      paymentStatus: data.payment_status === "paid" ? "PAID" : "PENDING",
    },
  });
}

export async function createOrderItems(orderId: string, products: Product[]) {
  return await Promise.all(
    products.map(async (product) => {
      return await prisma.orderItem.create({
        data: {
          orderId,
          productId: product.id,
          variantId: product.selectedVariant?.id,
          colorID: product.selectedColor?.id,
          quantity: product.quantity || 1,
          price: Number(product.price),
          total:
            (Number(product.price) + Number(product.selectedVariant?.price)) *
            Number(product.quantity),
        },
      });
    })
  );
}
