"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.All = All;
exports.FindOne = FindOne;
exports.CreateBrand = CreateBrand;
exports.DeleteBrand = DeleteBrand;
const db_1 = __importDefault(require("../utils/db"));
async function All() {
    return await db_1.default?.brand?.findMany();
}
async function FindOne(name) {
    return await db_1.default?.brand?.findFirst({ where: { name } });
}
async function CreateBrand(name) {
    return await db_1.default?.brand?.create({ data: { name } });
}
async function DeleteBrand(id) {
    return await db_1.default?.brand?.delete({ where: { id } });
}
