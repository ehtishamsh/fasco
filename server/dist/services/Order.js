"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExistingOrder = checkExistingOrder;
exports.checkOrderItems = checkOrderItems;
exports.createOrder = createOrder;
exports.refundStatus = refundStatus;
exports.createOrderItems = createOrderItems;
exports.getAllOrders = getAllOrders;
exports.getOrderById = getOrderById;
exports.getOrderByOrderNumber = getOrderByOrderNumber;
exports.getOrderItemsByOrderId = getOrderItemsByOrderId;
exports.getOrderByUserID = getOrderByUserID;
exports.updateOrderStatus = updateOrderStatus;
exports.allOrders = allOrders;
exports.getOrderByProductId = getOrderByProductId;
const db_1 = __importDefault(require("../utils/db"));
async function checkExistingOrder(paymentIntentId) {
    return await db_1.default.order.findFirst({
        where: {
            paymentIntentId,
        },
    });
}
async function checkOrderItems(orderId) {
    return await db_1.default.orderItem.findMany({
        where: {
            orderId,
        },
    });
}
async function createOrder(data, total, addressId, userId) {
    return await db_1.default.order.create({
        data: {
            orderNumber: Math.floor(Math.random() * 100000),
            addressId: addressId,
            userId: userId,
            amount: total,
            orderStatus: "PENDING",
            status: ["Your Order has been placed."],
            currency: "usd",
            paymentIntentId: data.payment_intentId,
            paymentStatus: data.payment_status === "paid" ? "PAID" : "PENDING",
        },
    });
}
async function refundStatus(orderId) {
    return await db_1.default.order.update({
        where: {
            id: orderId,
        },
        data: {
            updatedAt: new Date(),
            paymentStatus: "REFUNDED",
        },
    });
}
async function createOrderItems(orderId, products) {
    return await Promise.all(products.map(async (product) => {
        return await db_1.default.orderItem.create({
            data: {
                orderId,
                productId: product.id,
                variantId: product.selectedVariant?.id,
                colorID: product.selectedColor?.id,
                quantity: product.quantity || 1,
                price: Number(product.discounted) > 0
                    ? Number(product.discounted)
                    : Number(product.price),
                total: ((Number(product.discounted) > 0
                    ? Number(product.discounted)
                    : Number(product.price)) +
                    Number(product.selectedVariant?.price)) *
                    Number(product.quantity),
            },
        });
    }));
}
async function getAllOrders() {
    return await db_1.default.order.findMany();
}
async function getOrderById(id) {
    return await db_1.default.order.findUnique({
        where: {
            id,
        },
    });
}
async function getOrderByOrderNumber(orderNumber) {
    return await db_1.default.order.findUnique({
        where: {
            orderNumber,
        },
        select: {
            id: true,
            updatedAt: true,
            address: true,
            amount: true,
            currency: true,
            orderNumber: true,
            status: true,
            paymentStatus: true,
            paymentIntentId: true,
            user: {
                select: {
                    email: true,
                    firstname: true,
                    lastname: true,
                },
            },
            createdAt: true,
            orderStatus: true,
            items: {
                select: {
                    id: true,
                    price: true,
                    total: true,
                    variant: {
                        select: {
                            price: true,
                            variant: true,
                        },
                    },
                    color: {
                        select: {
                            color: true,
                        },
                    },
                    quantity: true,
                    product: {
                        select: {
                            title: true,
                            category: {
                                select: {
                                    name: true,
                                },
                            },
                            createdAt: true,
                            brand: {
                                select: {
                                    name: true,
                                },
                            },
                            id: true,
                            price: true,
                            slug: true,
                            updatedAt: true,
                            cover: true,
                            description: true,
                        },
                    },
                },
            },
        },
    });
}
async function getOrderItemsByOrderId(orderId) {
    return await db_1.default.orderItem.findMany({
        where: {
            orderId,
        },
    });
}
async function getOrderByUserID(id) {
    return await db_1.default.order.findMany({
        where: {
            userId: id,
        },
        select: {
            id: true,
            address: true,
            paymentIntentId: true,
            amount: true,
            currency: true,
            orderNumber: true,
            status: true,
            paymentStatus: true,
            createdAt: true,
            orderStatus: true,
            items: {
                select: {
                    id: true,
                    price: true,
                    total: true,
                    variant: {
                        select: {
                            price: true,
                            variant: true,
                        },
                    },
                    color: {
                        select: {
                            color: true,
                        },
                    },
                    quantity: true,
                    product: true,
                },
            },
        },
    });
}
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["COMPLETED"] = "COMPLETED";
})(OrderStatus || (OrderStatus = {}));
async function updateOrderStatus(orderNumber, orderStatus, status) {
    return await db_1.default.order.update({
        where: {
            orderNumber: parseInt(orderNumber),
        },
        data: {
            updatedAt: new Date(),
            orderStatus: {
                set: orderStatus,
            },
            status,
        },
    });
}
async function allOrders() {
    return await db_1.default.order.findMany({
        select: {
            id: true,
            address: true,
            amount: true,
            currency: true,
            orderNumber: true,
            status: true,
            user: {
                select: {
                    id: true,
                },
            },
            paymentStatus: true,
            paymentIntentId: true,
            createdAt: true,
            orderStatus: true,
            items: {
                select: {
                    id: true,
                    price: true,
                    total: true,
                    variant: {
                        select: {
                            price: true,
                            variant: true,
                        },
                    },
                    color: {
                        select: {
                            color: true,
                        },
                    },
                    quantity: true,
                    product: {
                        select: {
                            discounted: true,
                            title: true,
                            category: {
                                select: {
                                    name: true,
                                },
                            },
                            createdAt: true,
                            brand: {
                                select: {
                                    name: true,
                                },
                            },
                            id: true,
                            price: true,
                            slug: true,
                            updatedAt: true,
                            cover: true,
                            description: true,
                        },
                    },
                },
            },
        },
    });
}
async function getOrderByProductId(productId) {
    return await db_1.default.orderItem.findMany({
        where: {
            productId,
        },
        select: {
            id: true,
            price: true,
            total: true,
            variant: {
                select: {
                    price: true,
                    variant: true,
                },
            },
            color: {
                select: {
                    color: true,
                },
            },
            product: true,
        },
    });
}
