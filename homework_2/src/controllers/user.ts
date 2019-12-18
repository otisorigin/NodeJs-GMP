import User from "../models/User";
import { Request, Response } from "express";
import usersData from "../../data/users.json";

const users = usersData.map(
  user => new User(user.id, user.login, user.password, user.age)
);

//добавить обработку ошибок!
//добавить валидацию
//добавить getAll с limit

/**
 * GET /users/
 * Get all users.
 */
export const findAllUsers = (req: Request, res: Response) => {
  res.send(users.filter(user => user.isDeleted == false));
};

/**
 * GET /users/id
 * Get user by id.
 */
export const findUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(users.find(user => user.isDeleted == false && user.id == id));
};

export const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const user = users.find(user => user.isDeleted == false && user.id == id);
  user.age = req.body.age;
  user.login = req.body.login;
  user.password = req.body.password;
  res.sendStatus(200);
};

export const createUser = (req: Request, res: Response) => {
  const user = new User(req.body.id, req.body.login, req.body.password, req.body.age);
  users.push(user);
  res.sendStatus(200);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const user = users.find(user => user.isDeleted == false && user.id == id);
  user.isDeleted = true;
  res.sendStatus(200);
};
