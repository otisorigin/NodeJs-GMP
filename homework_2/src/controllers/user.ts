import User from "../models/User";
import { Request, Response } from "express";
import usersData from "../../data/users.json";

const users = usersData.map(
  user => new User(user.id, user.login, user.password, user.age)
);

/**
 * GET /users/
 * Get all users.
 */
export const getUsers = (req: Request, res: Response) => {
users[0].isDeleted = true;
  res.send(users.filter(user => user.isDeleted == false));
};
