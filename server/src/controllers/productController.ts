import { Request, Response } from "express";
import { All, FindOne } from "../services/Product";
import prisma from "../utils/db";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Fetch all products
    const products = await prisma.product.findMany();

    // Fetch all variants and colors in parallel
    const [productsVariants, productsColors] = await Promise.all([
      prisma.variant.findMany(),
      prisma.color.findMany(),
    ]);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Map through products and enrich data
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const getCateName = await prisma.category.findUnique({
          where: {
            id: product.categoryId,
          },
          select: {
            name: true,
          },
        });

        const getBrandName = await prisma.brand.findUnique({
          where: {
            id: product.brandId,
          },
          select: {
            name: true,
          },
        });

        const variants = productsVariants
          .filter((variant) => variant.productId === product.id)
          .map((variant) => ({
            name: variant.variant,
            price: variant.price,
          }));

        const colors = productsColors
          .filter((color) => color.productId === product.id)
          .map((color) => ({
            name: color.color,
          }));

        return {
          ...product,
          category: getCateName?.name || null,
          brand: getBrandName?.name || null,
          variants: variants,
          colors: colors,
        };
      })
    );
    res.status(200).json({
      products: productsWithDetails,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

interface Variant {
  id: number;
  name: string;
  price: number;
}
interface Color {
  id: number;
  name: string;
}
interface Product {
  title: string;
  price: string;
  stock: number;
  description: string;
  categoryId: string;
  brandId: string;
  variants: Variant[];
  cover: string;
  screenSize: string;
  cpu: string;
  cores: string;
  mainCamera: string;
  frontCamera?: string;
  battery: string;
  ram: string;
  colors: Color[];
}
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      cover,
      price,
      stock,
      brandId,
      categoryId,
      variants,
      colors,
      screenSize,
      cpu,
      cores,
      mainCamera,
      ram,
      frontCamera,
      battery,
    }: Product = req.body;

    const checkifexist = await FindOne(title);
    if (checkifexist) {
      return res.status(400).send("Product already exists");
    }

    const newProduct = await prisma?.product?.create({
      data: {
        title,
        description,
        cover,
        price,
        stock,
        brandId,
        categoryId,
        screenSize,
        cpu,
        cores,
        mainCamera,
        ram,
        frontCamera,
        battery,
      },
    });

    if (!newProduct) {
      return res.status(500).send("Failed to create product");
    }

    let variantIds: string[] = [];
    if (variants.length > 0) {
      const newVariants = await Promise.all(
        variants.map(async (variant) => {
          try {
            const existingVariant = await prisma?.variant?.findFirst({
              where: {
                variant: variant.name,
                productId: newProduct.id,
              },
            });

            if (existingVariant) {
              variantIds.push(existingVariant.id);
              return existingVariant;
            }

            const newVariant = await prisma?.variant?.create({
              data: {
                price: String(variant.price),
                productId: newProduct.id,
                variant: variant.name,
              },
            });

            if (newVariant) {
              variantIds.push(newVariant.id);
            }

            return newVariant;
          } catch (error) {
            console.error(`Failed to create variant: ${variant.name}`, error);
            throw new Error(`Failed to create variant: ${variant.name}`);
          }
        })
      );

      if (!newVariants) {
        return res.status(500).send("Failed to create variants");
      }
    }

    let colorIds: string[] = [];
    if (colors.length > 0) {
      const newColors = await Promise.all(
        colors.map(async (color) => {
          try {
            const existingColor = await prisma?.color?.findFirst({
              where: {
                color: color.name,
                productId: newProduct.id,
              },
            });

            if (existingColor) {
              colorIds.push(existingColor.id);
              return existingColor;
            }

            const newColor = await prisma?.color?.create({
              data: {
                productId: newProduct.id,
                color: color.name,
              },
            });

            if (newColor) {
              colorIds.push(newColor.id);
            }

            return newColor;
          } catch (error) {
            console.error(`Failed to create color: ${color.name}`, error);
            throw new Error(`Failed to create color: ${color.name}`);
          }
        })
      );

      if (!newColors) {
        return res.status(500).send("Failed to create colors");
      }
    }

    return res.json({
      newProduct,
      variantIds,
      colorIds,
      status: 200,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const getProduct = await prisma?.product.findFirst({
      where: {
        slug: id,
      },
    });

    if (!getProduct) {
      return res.status(404).send("Product not found"); // Use return to exit the function
    }
    const [productsVariants, productsColors] = await Promise.all([
      prisma.variant.findMany(),
      prisma.color.findMany(),
    ]);
    const getCateName = await prisma.category.findUnique({
      where: {
        id: getProduct?.categoryId,
      },
      select: {
        name: true,
      },
    });

    const getBrandName = await prisma.brand.findUnique({
      where: {
        id: getProduct?.brandId,
      },
      select: {
        name: true,
      },
    });

    const variants = productsVariants
      .filter((variant) => variant?.productId === getProduct?.id)
      .map((variant) => ({
        name: variant.variant,
        price: variant.price,
      }));

    const colors = productsColors
      .filter((color) => color?.productId === getProduct?.id)
      .map((color) => ({
        name: color.color,
      }));
    const product = {
      ...getProduct,
      category: getCateName?.name,
      brand: getBrandName?.name,
      variants,
      colors,
    };

    return res.json({
      product,
      status: 200,
      message: "Product fetched successfully",
    }); // Use return to exit the function
  } catch (error) {
    console.log(error);
    return res.status(500).send(error); // Use return to exit the function
  }
}