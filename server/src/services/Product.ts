import prisma from "../utils/db";

export async function All() {
  return await prisma?.product?.findMany();
}

export async function FindOne(id: string) {
  return await prisma?.product?.findFirst({ where: { id: id } });
}
