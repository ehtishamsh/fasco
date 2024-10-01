"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
exports.getAllCategories = getAllCategories;
exports.createCategory = createCategory;
const Category_1 = require("../services/Category");
const zod_1 = require("zod");
const Product_1 = require("../services/Product");
const formSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Category Name is required")
        .max(40, "Category Name is too long"),
});
async function getAllCategories(req, res) {
    try {
        const categories = await (0, Category_1.All)();
        if (!categories) {
            res.status(404).send("No categories found");
        }
        res.json({
            categories,
            status: 200,
            message: "Categories fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
async function createCategory(req, res) {
    try {
        const { name } = formSchema.parse(req.body);
        const category = await (0, Category_1.One)(name);
        if (category) {
            res.status(400).send("Category already exists");
        }
        const newCategory = await (0, Category_1.Create)(name);
        if (!newCategory) {
            res.status(500).send("Failed to create category");
        }
        res.json({
            newCategory,
            status: 200,
            message: "Category created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const getCate = await (0, Product_1.getCategoryNameById)(id);
        if (!getCate) {
            return res.status(404).send("Category not found");
        }
        const deleteCategory = await (0, Category_1.Delete)(id);
        if (!deleteCategory) {
            return res.status(404).send("Category not found");
        }
        return res.json({
            status: 200,
            message: "Category deleted successfully",
            data: deleteCategory,
        });
    }
    catch {
        console.log("error");
        return res.status(500).send("Failed to delete Category");
    }
};
exports.deleteCategory = deleteCategory;
