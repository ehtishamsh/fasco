import prisma from "../utils/db";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function findUniqueUserById(email: string): Promise<User | null> {
  return prisma?.user?.findUnique({
    where: { email: email },
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma?.user?.findFirst({
    where: { email: email },
  });
}
