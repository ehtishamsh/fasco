import { Request, Response } from "express";
import { findUserByEmail } from "../services/User";
import { generateToken } from "../utils/passport";
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};
