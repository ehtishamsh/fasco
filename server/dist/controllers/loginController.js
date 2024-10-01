"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const zod_1 = require("zod");
const User_1 = require("../services/User");
const auth_1 = require("../utils/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const FormSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, { message: "Email address is required" })
        .email({ message: "Please enter a valid email address" }),
    password: zod_1.z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
});
async function login(req, res) {
    try {
        const { email, password } = FormSchema.parse(req.body);
        const findUser = await (0, User_1.findUniqueUserById)(email);
        if (!findUser) {
            res.status(404).send("User not found");
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, findUser?.password);
        if (!isPasswordValid) {
            res.status(400).send("Password is incorrect");
        }
        const token = (0, auth_1.generateToken)(findUser);
        const removePassword = { ...findUser, password: undefined };
        return res
            .status(200)
            .json({ token, user: removePassword, message: "Login successful" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
