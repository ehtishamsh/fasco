import prisma from "../utils/db";

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const createUser = async (email: string, name?: string) => {
  return await prisma.user.create({
    data: { email, name },
  });
};

export default { getAllUsers, createUser };
