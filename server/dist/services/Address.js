"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETALL = GETALL;
exports.GETBYID = GETBYID;
exports.GETBYUSERID = GETBYUSERID;
exports.CREATE = CREATE;
exports.UPDATE = UPDATE;
exports.DELETE = DELETE;
const db_1 = __importDefault(require("../utils/db"));
async function GETALL() {
    const data = await db_1.default?.address?.findMany();
    return data;
}
async function GETBYID(id) {
    const data = await db_1.default?.address?.findFirst({
        where: {
            id: id,
        },
    });
    return data;
}
async function GETBYUSERID(id) {
    const data = await db_1.default?.address?.findMany({
        where: {
            userId: id,
        },
    });
    return data;
}
async function CREATE(data) {
    return await db_1.default.address.create({ data });
}
async function UPDATE(id, data) {
    return await db_1.default.address.update({ where: { id }, data });
}
async function DELETE(id) {
    return await db_1.default.address.delete({ where: { id } });
}
