"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = getDashboardData;
const db_1 = __importDefault(require("../utils/db"));
async function getDashboardData() {
    const totalUsers = await db_1.default.user.count();
    const totalProducts = await db_1.default.product.count();
    const totalOrders = await db_1.default.order.count();
    const usersByMonth = await db_1.default.user.groupBy({
        by: ["createdAt"],
        _count: {
            id: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    const ordersByMonth = await db_1.default.order.groupBy({
        by: ["createdAt"],
        _count: {
            id: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    const pendingOrders = await db_1.default.order.count({
        where: {
            orderStatus: "PENDING",
        },
    });
    const completedOrders = await db_1.default.order.count({
        where: {
            orderStatus: "COMPLETED",
        },
    });
    const cancelledOrders = await db_1.default.order.count({
        where: {
            orderStatus: "CANCELLED",
        },
    });
    const totalReviews = await db_1.default.review.count();
    const totalSales = await db_1.default.order.aggregate({ _sum: { amount: true } });
    const salesByMonth = await db_1.default.order.groupBy({
        by: ["createdAt"],
        _sum: {
            amount: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return {
        totalUsers: {
            all: totalUsers,
            monthly: usersByMonth,
        },
        totalProducts,
        totalOrders: {
            all: totalOrders,
            monthly: ordersByMonth,
        },
        totalReviews,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalSales: totalSales._sum.amount || 0,
        salesByMonth,
    };
}
