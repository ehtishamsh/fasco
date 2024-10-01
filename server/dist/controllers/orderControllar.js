"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = createOrderController;
exports.getUserOrdersController = getUserOrdersController;
exports.getOrderDetail = getOrderDetail;
exports.updateOrderController = updateOrderController;
exports.getAllOrders = getAllOrders;
const Order_1 = require("../services/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
async function createOrderController(req, res) {
    const data = req.body;
    try {
        if (data.products.length === 0) {
            return res
                .status(400)
                .json({ message: "No products in the cart", status: 400 });
        }
        const checkifOrderExists = await (0, Order_1.checkExistingOrder)(data.payment_intentId);
        if (checkifOrderExists) {
            const orderItems = await (0, Order_1.checkOrderItems)(checkifOrderExists.id);
            if (orderItems.length > 0) {
                return res
                    .status(400)
                    .json({ message: "Order already exists", status: 400 });
            }
            return res
                .status(400)
                .json({ message: "Order Already exists", status: 400 });
        }
        const total = data.products.reduce((acc, product) => {
            const productTotal = (Number(product.discounted) > 0
                ? Number(product.discounted)
                : Number(product.price)) +
                Number(product.selectedVariant?.price || 0) * Number(product.quantity);
            return acc + productTotal;
        }, 0);
        const order = await (0, Order_1.createOrder)(data, total, data.addressId, data.userId);
        if (!order) {
            return res
                .status(400)
                .json({ message: "Error creating order", status: 400 });
        }
        const orderItems = await (0, Order_1.createOrderItems)(order.id, data.products);
        if (!orderItems) {
            return res
                .status(400)
                .json({ message: "Error creating order items", status: 400 });
        }
        return res.status(200).json({
            message: "Order created successfully",
            status: 200,
            order,
            orderItems,
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        return res.json({ message: "Error creating order", status: 400 });
    }
}
async function getUserOrdersController(req, res) {
    try {
        const userId = req.params.id;
        const recentOrders = await (0, Order_1.getOrderByUserID)(userId);
        if (!recentOrders) {
            return res.status(404).json({ message: "Orders not found", status: 404 });
        }
        return res.status(200).json({
            message: "Orders fetched successfully",
            status: 200,
            data: recentOrders,
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        return res.json({ message: "Error fetching orders", status: 400 });
    }
}
async function getOrderDetail(req, res) {
    const { id } = req.params;
    try {
        const order = await (0, Order_1.getOrderByOrderNumber)(Number(id));
        if (!order) {
            return res.status(404).json({ message: "Order not found", status: 404 });
        }
        return res.status(200).json({
            message: "Order fetched successfully",
            status: 200,
            data: order,
        });
    }
    catch {
        res
            .status(400)
            .json({ message: "Error fetching order items", status: 400 });
    }
}
async function updateOrderController(req, res) {
    const { status, orderNumber, orderStatus, payment_intent_id } = req.body;
    try {
        if (!status || !orderNumber) {
            return res
                .status(400)
                .json({ message: "All fields are required", status: 400 });
        }
        const findorder = await (0, Order_1.getOrderByOrderNumber)(Number(orderNumber));
        if (!findorder) {
            return res.status(404).json({ message: "Order not found", status: 404 });
        }
        const order = await (0, Order_1.updateOrderStatus)(orderNumber, orderStatus, status);
        if (!order) {
            return res
                .status(400)
                .json({ message: "Error updating order", status: 400 });
        }
        if (orderStatus === "CANCELLED" && payment_intent_id) {
            const refund = await stripe.refunds.create({
                payment_intent: payment_intent_id,
            });
            const updatedOrder = await (0, Order_1.refundStatus)(order.id);
            return res.status(200).json({
                message: "Order updated successfully",
                status: 200,
                data: updatedOrder,
                success: true,
                refund,
            });
        }
        return res.status(200).json({
            message: "Order updated successfully",
            status: 200,
            data: order,
            success: true,
        });
    }
    catch (error) {
        console.error("Error updating order:", error);
        return res
            .status(400)
            .json({ message: "Error updating order", status: 400 });
    }
}
async function getAllOrders(req, res) {
    try {
        const getOrders = await (0, Order_1.allOrders)();
        if (!getOrders) {
            res.status(400).json({
                message: "Faild to get orders",
            });
        }
        res.status(200).json({
            message: "All orders fetched successfully",
            orders: getOrders,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ message: "Error updating order", status: 400 });
    }
}
