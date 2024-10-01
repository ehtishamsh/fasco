"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLADDRESS = ALLADDRESS;
exports.CREATEADDRESS = CREATEADDRESS;
exports.UPDATEADDRESS = UPDATEADDRESS;
exports.DELETEADDRESS = DELETEADDRESS;
exports.GETSINGLEADDRESS = GETSINGLEADDRESS;
exports.GETUSERADDRESS = GETUSERADDRESS;
const Address_1 = require("../services/Address");
const db_1 = __importDefault(require("../utils/db"));
async function ALLADDRESS(req, res) {
    try {
        const getAddress = await (0, Address_1.GETALL)();
        if (!getAddress) {
            return res.status(404).json({
                status: 404,
                message: "No address found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Address fetched successfully",
            address: getAddress,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
async function CREATEADDRESS(req, res) {
    const { firstname, lastname, addressLine1, addressLine2, city, state, postalCode, country, defaultAddress, shipping, billing, userId, } = req.body;
    if (!addressLine1) {
        return res.status(400).json({
            status: 400,
            message: "Address is required",
        });
    }
    try {
        const createAddress = await (0, Address_1.CREATE)({
            firstname,
            lastname,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            default: defaultAddress,
            shipping,
            billing,
            userId,
        });
        if (!createAddress) {
            return res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Address created successfully",
            address: createAddress,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
async function UPDATEADDRESS(req, res) {
    const { id, firstname, lastname, addressLine1, addressLine2, city, state, postalCode, country, defaultAddress, shipping, billing, userId, } = req.body;
    if (!addressLine1) {
        return res.status(400).json({
            status: 400,
            message: "Address is required",
        });
    }
    try {
        const checkifexist = await (0, Address_1.GETBYID)(id);
        if (!checkifexist) {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
        const updatedAddress = await (0, Address_1.UPDATE)(id, {
            firstname,
            lastname,
            addressLine1,
            addressLine2,
            city,
            state,
            billing,
            country,
            default: defaultAddress,
            postalCode: postalCode,
            shipping,
            userId,
        });
        if (!updatedAddress) {
            return res.status(500).json({
                status: 500,
                message: "Internal server error",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Address updated successfully",
            address: updatedAddress,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
async function DELETEADDRESS(req, res) {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            status: 400,
            message: "Id is required",
        });
    }
    try {
        const deleteAddress = await (0, Address_1.DELETE)(id);
        if (!deleteAddress) {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Address deleted successfully",
            address: deleteAddress,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
async function GETSINGLEADDRESS(req, res) {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            status: 400,
            message: "Id is required",
        });
    }
    try {
        const getAddress = await (0, Address_1.GETBYID)(id);
        if (!getAddress) {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Address fetched successfully",
            address: getAddress,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
async function GETUSERADDRESS(req, res) {
    try {
        const { id } = req.body;
        const getAddress = await db_1.default?.address?.findMany({
            where: {
                userId: id,
            },
        });
        if (!getAddress) {
            return res.status(404).json({
                status: 404,
                message: "Address not found",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Address fetched successfully",
            address: getAddress,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
