import { Request, Response } from "express";
import { All, Create, One } from "../services/Category";
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await All();
    if (!categories) {
      res.status(404).send("No categories found");
    }
    res.json({
      categories,
      status: 200,
      message: "Categories fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
export async function createCategory(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const category = await One(name);
    if (category) {
      res.status(400).send("Category already exists");
    }
    const newCategory = await Create(name);
    if (!newCategory) {
      res.status(500).send("Failed to create category");
    }
    res.json({
      newCategory,
      status: 200,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
