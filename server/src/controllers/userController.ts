import { Request, Response } from "express";
import userService from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      res.status(404).send("No users found");
    }
    res.json(users);
  } catch (error) {
    console.log("error", error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const user = await userService.createUser(email, name);
  res.json(user);
};
