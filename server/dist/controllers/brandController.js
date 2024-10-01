"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = void 0;
exports.GetAll = GetAll;
exports.Create = Create;
const Brand_1 = require("../services/Brand");
const zod_1 = require("zod");
const Product_1 = require("../services/Product");
const formSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Brand Name is required")
        .max(40, "Brand Name is too long"),
});
async function GetAll(req, res) {
    try {
        const brands = await (0, Brand_1.All)();
        if (!brands) {
            res.status(404).send("No brands found");
        }
        res.json({
            status: 200,
            message: "Brands fetched successfully",
            brands,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
async function Create(req, res) {
    try {
        const { name } = formSchema.parse(req.body);
        const checkifexist = await (0, Brand_1.FindOne)(name);
        if (checkifexist) {
            res.status(400).send("Brand already exists");
        }
        const createBrand = await (0, Brand_1.CreateBrand)(name);
        if (!createBrand) {
            res.status(500).send("Failed to create brand");
        }
        res.json({
            status: 200,
            message: "Brand created successfully",
            createBrand,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const getBrand = await (0, Product_1.getBrandNameById)(id);
        if (!getBrand) {
            return res.status(404).send("Brand not found");
        }
        const deleteBrand = await (0, Brand_1.DeleteBrand)(id);
        if (!deleteBrand) {
            return res.status(404).send("Brand not found");
        }
        return res.json({
            status: 200,
            message: "Brand deleted successfully",
            data: deleteBrand,
        });
    }
    catch {
        console.log("error");
        return res.status(500).send("Failed to delete Brand");
    }
};
exports.deleteBrand = deleteBrand;
