"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUsers = void 0;
const userService_1 = __importDefault(require("../services/userService"));
const User_1 = require("../services/User");
const auth_1 = require("../utils/auth");
const getUsers = async (req, res) => {
    try {
        const users = await userService_1.default.getAllUsers();
        if (!users) {
            res.status(404).send("No users found");
        }
        res.json(users);
    }
    catch (error) {
        console.log("error", error);
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    try {
        const { id, firstname, lastname, email, gender, dob } = req.body;
        const user = await (0, User_1.UpdateUser)({
            id,
            firstname,
            lastname,
            email,
            gender,
            birthday: dob,
            updatedAt: new Date(),
        });
        if (!user) {
            res.status(404).send("User not found");
        }
        const token = await (0, auth_1.generateToken)(user);
        const removePassword = { ...user, password: undefined };
        res.json({
            status: 200,
            message: "User updated successfully",
            user: removePassword,
            token,
        });
    }
    catch (error) {
        console.log("error", error);
    }
};
exports.updateUser = updateUser;
