"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUniqueUserById = findUniqueUserById;
exports.findUserByEmail = findUserByEmail;
exports.UpdateUser = UpdateUser;
exports.findUserByID = findUserByID;
const db_1 = __importDefault(require("../utils/db"));
async function findUniqueUserById(email) {
    return db_1.default?.user?.findUnique({
        where: { email: email },
    });
}
async function findUserByEmail(email) {
    return db_1.default?.user?.findFirst({
        where: { email: email },
    });
}
async function UpdateUser(User) {
    return db_1.default?.user?.update({
        where: {
            id: User.id,
        },
        data: User,
    });
}
async function findUserByID(userId) {
    return db_1.default?.user?.findFirst({
        where: {
            id: userId,
        },
    });
}
