"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.All = All;
exports.One = One;
exports.Create = Create;
exports.Delete = Delete;
const db_1 = __importDefault(require("../utils/db"));
async function All() {
    return await db_1.default.category.findMany();
}
async function One(name) {
    return await db_1.default.category.findFirst({ where: { name: name } });
}
async function Create(name) {
    return await db_1.default.category.create({ data: { name } });
}
async function Delete(id) {
    return await db_1.default.category.delete({ where: { id } });
}
