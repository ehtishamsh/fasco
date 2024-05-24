import { Request, Response } from "express";
import { findUserByEmail } from "../services/User";
export async function loginController(req: Request, res: Response) {
  try {
    const findUser = await findUserByEmail(req.body.email);
    if (!findUser) {
      res.status(404).send("User not found");
    }
    res.json(findUser);
  } catch (error) {
    console.log(error);
  }
}
