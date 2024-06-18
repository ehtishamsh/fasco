import { Request, Response } from "express";
import { All, FindOne, CreateBrand } from "../services/Brand";
import { z } from "zod";
import prisma from "../utils/db";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Brand Name is required")
    .max(40, "Brand Name is too long"),
});
export async function GetAll(req: Request, res: Response) {
  try {
    const brands = await All();
    if (!brands) {
      res.status(404).send("No brands found");
    }
    res.json({
      status: 200,
      message: "Brands fetched successfully",
      brands,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function Create(req: Request, res: Response) {
  try {
    const { name } = formSchema.parse(req.body);
    const checkifexist = await FindOne(name);
    if (checkifexist) {
      res.status(400).send("Brand already exists");
    }
    const createBrand = await CreateBrand(name);
    if (!createBrand) {
      res.status(500).send("Failed to create brand");
    }
    res.json({
      status: 200,
      message: "Brand created successfully",
      createBrand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
