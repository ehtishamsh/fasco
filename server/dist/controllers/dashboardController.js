"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const Dashboard_1 = require("../services/Dashboard");
const dashboardController = async (req, res) => {
    try {
        const data = await (0, Dashboard_1.getDashboardData)();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};
exports.dashboardController = dashboardController;
