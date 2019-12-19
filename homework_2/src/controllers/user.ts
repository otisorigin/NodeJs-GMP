import User from "../models/User";
import { Request, Response } from "express";
import usersData from "../../data/users.json";

const users = usersData.map(
  user => new User(user.id, user.login, user.password, user.age)
);

//добавить валидацию

/**
 * GET /users/
 * Get all users. In body parameters subLogin and limit.
 */
const findAllUsers = (req: Request, res: Response) => {
  let availableUsers = users
    .filter(user => user.isDeleted == false)
    .sort((a, b) => (a.login > b.login ? 1 : -1));
  let loginSubstring = req.body.loginSubstring;
  let limit = req.body.limit;
  if (
    availableUsers.length > 0 &&
    loginSubstring != undefined &&
    limit != undefined
  ) {
    res.send(
      availableUsers
        .filter(user => user.login.includes(loginSubstring))
        .slice(0, limit)
    );
  } else {
    res.send(availableUsers);
  }
};

/**
 * GET /users/id
 * Get user by id.
 */
const findUser = (req: Request, res: Response) => {
  const id = req.params.id;
  let user = getUserById(id);
  if (user != undefined) {
    res.send(user);
  } else {
    res.status(204);
  }
};

/**
 * PUT /users/id
 * Update user by id.
 */
const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const user = getUserById(id);
  if (user == undefined) {
    res.status(204);
  }
  user.age = req.body.age;
  user.login = req.body.login;
  user.password = req.body.password;
  res.sendStatus(200);
};

/**
 * POST /users
 * Create new user.
 */
const createUser = (req: Request, res: Response) => {
  let id = req.body.id;
  if (getUserById(id) != undefined) {
    res.status(400).send({
      error: "User with such id already exists!"
    });
  } else {
    const user = new User(id, req.body.login, req.body.password, req.body.age);
    users.push(user);
    res.status(201).send({
      message: "User created."
    });
  }
};

/**
 * DELETE /users/id
 * Remove user by id.
 */
const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const user = getUserById(id);
  if (user != undefined) {
    user.isDeleted = true;
    res.sendStatus(200);
  } else {
    res.status(204);
  }
};

const getUserById = (id: string) =>
  users.find(user => user.isDeleted == false && user.id == id);

export default { findAllUsers, findUser, createUser, updateUser, deleteUser };
