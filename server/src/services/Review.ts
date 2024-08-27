import prisma from "../utils/db";

export async function getAll() {
  return await prisma.review.findMany();
}

export async function getOne(userid: string, productid: string) {
  return await prisma.review.findMany({
    where: {
      userId: userid,
      productId: productid,
    },
  });
}
export async function getReviewsByUserID(id: string) {
  return await prisma.review.findMany({
    where: {
      userId: id,
    },
  });
}
export async function create(data: any) {
  return await prisma.review.create({ data });
}
