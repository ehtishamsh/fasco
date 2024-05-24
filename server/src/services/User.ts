import prisma from "../utils/db";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function findUniqueUserById(id: string): Promise<User | null> {
  return prisma?.user?.findUnique({
    where: { id: id },
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma?.user?.findFirst({
    where: { email: email },
  });
}
