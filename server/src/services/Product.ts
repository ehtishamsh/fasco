import prisma from "../utils/db";

interface Product {
  title: string;
  price: string;
  stock: number;
  description: string;
  categoryId: string;
  brandId: string;
  cover: string;
  screenSize: string;
  cpu: string;
  cores: string;
  mainCamera: string;
  frontCamera?: string;
  battery: string;
  ram: string;
}
export async function getAllProducts() {
  return await prisma.product.findMany();
}

export async function getAllVariants() {
  return await prisma.variant.findMany();
}

export async function getAllColors() {
  return await prisma.color.findMany();
}

export async function getCategoryNameById(id: string) {
  return await prisma.category.findUnique({
    where: { id },
  });
}

export async function getBrandNameById(id: string) {
  return await prisma.brand.findUnique({
    where: { id },
  });
}

export async function findProductByTitle(title: string) {
  return await prisma.product.findFirst({ where: { title } });
}

export async function createProduct(data: Product) {
  return await prisma.product.create({ data });
}

export async function findVariantByNameAndProductId(
  name: string,
  productId: string
) {
  return await prisma.variant.findFirst({
    where: { variant: name, productId },
  });
}

export async function createVariant(data: any) {
  return await prisma.variant.create({ data });
}

export async function findColorByNameAndProductId(
  name: string,
  productId: string
) {
  return await prisma.color.findFirst({
    where: { color: name, productId },
  });
}

export async function createColor(data: any) {
  return await prisma.color.create({ data });
}

export async function findProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug } });
}

export async function findProductById(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}
