import { Router, Request, Response, NextFunction } from "express";
import validator from "../middlewares/requestValidator";
import userSchema from "../../types/schemas/userSchema";
import * as service from "../../services/userService";
import UserDTO from "../../types/dto/UserDTO";
import log from "../../utils/winston";
import auth from "../middlewares/tokenValidator";

const route = Router();

/**
 * GET /users/
 * Get all users. In body parameters subLogin and limit.
 */
const findAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const loginSubstring = req.body.loginSubstring;
  const limit = req.body.limit;
  try {
    let users;
    if (loginSubstring !== undefined && limit !== undefined) {
      users = await service.findAllUsersWithParameters(limit, loginSubstring);
    } else {
      users = await service.findAllUsers();
    }
    res.send(users);
  } catch (err) {
    log.info(`Catched exception in: ${findAllUsers.name} ${module.filename}`);
    next(err);
  }
};

/**
 * GET /users/id
 * Get user by id.
 */
const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let user = await service.findUserById(Number(req.params.id));
    res.send(user);
  } catch (err) {
    log.info(`Catched exception in: ${findUser.name} ${module.filename}`);
    next(err);
  }
};

/**
 * PUT /users/id
 * Update user by id.
 */
const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userDTO = req.body as UserDTO;
  try {
    await service.updateUser(userDTO);
    res.sendStatus(200);
  } catch (err) {
    log.info(`Catched exception in: ${updateUser.name} ${module.filename}`);
    next(err);
  }
};

/**
 * POST /users
 * Create new user.
 */
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userDTO = req.body as UserDTO;
  try {
    await service.createUser(userDTO);
    res.status(201).send({
      message: "User created."
    });
  } catch (err) {
    log.info(`Catched exception in: ${createUser.name} ${module.filename}`);
    next(err);
  }
};

/**
 * DELETE /users/id
 * Remove user by id.
 */
const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await service.removeUser(Number(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    log.info(`Catched exception in: ${deleteUser.name} ${module.filename}`);
    next(err);
  }
};

/**
 * GET /users/id/groups/
 * Get groups which belongs to this user.
 */
const findUserGroups = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let groups = await service.findUserGroups(Number(req.params.id));
    res.send(groups);
  } catch (err) {
    log.info(`Catched exception in: ${findUserGroups.name} ${module.filename}`);
    next(err);
  }
};

route.get("/", auth, findAllUsers);
route.get("/:id", auth, findUser);
route.post("/", [auth, validator(userSchema)], createUser);
route.put("/:id", [auth, validator(userSchema)], updateUser);
route.delete("/:id", auth, deleteUser);
route.get("/:id/groups/", auth, findUserGroups);

export default {
  route,
  findUserGroups,
  findAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser
};
