import { Request, Response } from "express";
import {
  getAllProducts,
  getAllVariants,
  getAllColors,
  getCategoryNameById,
  getBrandNameById,
  findProductByTitle,
  createProduct,
  findVariantByNameAndProductId,
  createVariant,
  findColorByNameAndProductId,
  createColor,
  findProductBySlug,
  findProductById,
} from "../services/Product";

interface Color {
  id: number;
  name: string;
}
interface Variant {
  id: number;
  name: string;
  price: string;
}
export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    const [productsVariants, productsColors] = await Promise.all([
      getAllVariants(),
      getAllColors(),
    ]);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        const getCateName = await getCategoryNameById(product.categoryId);
        const getBrandName = await getBrandNameById(product.brandId);

        const variants = productsVariants
          .filter((variant) => variant.productId === product.id)
          .map((variant) => ({ name: variant.variant, price: variant.price }));

        const colors = productsColors
          .filter((color) => color.productId === product.id)
          .map((color) => ({ name: color.color }));

        return {
          ...product,
          category: getCateName?.name || null,
          brand: getBrandName?.name || null,
          variants,
          colors,
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

// Create Product
export const createProductController = async (req: Request, res: Response) => {
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
      slug,
      cores,
      mainCamera,
      ram,
      frontCamera,
      battery,
    } = req.body;
    const checkifexist = await findProductByTitle(title);
    if (checkifexist) {
      return res.status(400).send("Product already exists");
    }

    const newProduct = await createProduct({
      battery,
      brandId,
      categoryId,
      cpu,
      cores,
      cover,
      description,
      frontCamera,
      mainCamera,
      ram,
      screenSize,
      slug,
      title,
      price,
      stock,
    });

    if (!newProduct) {
      return res.status(500).send("Failed to create product");
    }

    let variantIds: string[] = [];
    if (variants.length > 0) {
      const newVariants = await Promise.all(
        variants.map(async (variant: any) => {
          const existingVariant = await findVariantByNameAndProductId(
            variant.variant,
            newProduct.id
          );

          if (existingVariant) {
            variantIds.push(existingVariant.id);
            return existingVariant;
          }

          const newVariant = await createVariant({
            price: String(variant.price),
            productId: newProduct.id,
            variant: variant.variant,
          });

          if (newVariant) {
            variantIds.push(newVariant.id);
          }

          return newVariant;
        })
      );

      if (!newVariants) {
        return res.status(500).send("Failed to create variants");
      }
    }

    let colorIds: string[] = [];
    if (colors.length > 0) {
      const newColors = await Promise.all(
        colors.map(async (color: any) => {
          const existingColor = await findColorByNameAndProductId(
            color.name,
            newProduct.id
          );

          if (existingColor) {
            colorIds.push(existingColor.id);
            return existingColor;
          }

          const newColor = await createColor({
            productId: newProduct.id,
            color: color.name,
          });

          if (newColor) {
            colorIds.push(newColor.id);
          }

          return newColor;
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

// Get Product by Slug
export const getProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getProduct = await findProductBySlug(id);

    if (!getProduct) {
      return res.status(404).send("Product not found");
    }

    const [productsVariants, productsColors] = await Promise.all([
      getAllVariants(),
      getAllColors(),
    ]);

    const getCateName = await getCategoryNameById(getProduct.categoryId);
    const getBrandName = await getBrandNameById(getProduct.brandId);

    const variants = productsVariants
      .filter((variant) => variant.productId === getProduct.id)
      .map((variant) => ({
        id: variant.id,
        name: variant.variant,
        price: variant.price,
      }));

    const colors = productsColors
      .filter((color) => color.productId === getProduct.id)
      .map((color) => ({ id: color.id, name: color.color }));

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
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getProduct = await findProductById(id);
    if (!getProduct) {
      return res.status(404).send("Product not found");
    }
    return res.json({
      data: getProduct,
      status: 200,
      message: "Product fetched successfully",
    });
  } catch {
    return res.status(500).send("Failed to fetch product");
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      price,
      stock,
      description,
      categoryId,
      brandId,
      variants,
      cover,
      screenSize,
      cpu,
      cores,
      mainCamera,
      frontCamera,
      battery,
      ram,
      colors,
    } = req.body;
    console.log(req.body);
    const checkifexist = await findProductById(id);
    if (!checkifexist) {
      return res.status(404).send("Product not found");
    }
    const findCategory = await getCategoryNameById(categoryId);
    if (!findCategory) {
      return res.status(404).send("Category not found");
    }
    const findBrand = await getBrandNameById(brandId);
    if (!findBrand) {
      return res.status(404).send("Brand not found");
    }

    return res.json({
      status: 200,
      message: "Product updated successfully",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
