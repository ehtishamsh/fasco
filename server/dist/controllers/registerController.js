"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
const db_1 = __importDefault(require("../utils/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const FormSchema = zod_1.z.object({
    firstname: zod_1.z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastname: zod_1.z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: zod_1.z
        .string()
        .min(1, { message: "Email address is required" })
        .email({ message: "Please enter a valid email address" }),
    password: zod_1.z
        .string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
});
async function register(req, res) {
    try {
        const { firstname, lastname, email, password } = FormSchema.parse(req.body);
        if (!db_1.default) {
            throw new Error("Prisma client is not initialized");
        }
        const checkifexits = await db_1.default.user.findFirst({
            where: { email: email },
        });
        if (checkifexits) {
            res.status(400).send("User already exists");
            return;
        }
        const hashedpassword = await bcrypt_1.default.hash(password, 10);
        const user = await db_1.default.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedpassword,
                role: "customer",
            },
        });
        const removedPassword = { ...user, password: undefined };
        res.json({
            message: "user created successfully",
            user: removedPassword,
            status: 200,
        });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send(error);
    }
}
