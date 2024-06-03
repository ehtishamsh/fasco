import prisma from "../utils/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const checkifexits = await prisma?.user?.findFirst({
      where: {
        email: email,
      },
    });
    if (checkifexits) {
      res.status(400).send("User already exists");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await prisma?.user?.create({
      data: {
        name: username,
        email: email,
        password: hashedpassword,
        role: "customer",
      },
    });

    res.json({
      message: "user created successfully",
      user: user,
      status: 200,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
