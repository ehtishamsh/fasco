import prisma from "../utils/db";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
export async function register(req: Request, res: Response) {
  try {
    const { username, email, password } = FormSchema.parse(req.body);

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

    const removedPassword = { ...user, password: undefined };
    res.json({
      message: "user created successfully",
      user: removedPassword,
      status: 200,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
