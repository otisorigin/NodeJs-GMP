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
const findAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const loginSubstring = req.body.loginSubstring;
  const limit = req.body.limit;
  if (loginSubstring !== undefined && limit !== undefined) {
    service
      .findAllUsersWithParameters(limit, loginSubstring)
      .then(users => res.send(users))
      .catch(err => {
        log.info(
          `Catched exception in: ${findAllUsers.name} ${module.filename}`
        );
        next(err);
      });
  } else {
    service
      .findAllUsers()
      .then(users => res.send(users))
      .catch(err => {
        log.info(
          `Catched exception in: ${findAllUsers.name} ${module.filename}`
        );
        next(err);
      });
  }
};

/**
 * GET /users/id
 * Get user by id.
 */
const findUser = (req: Request, res: Response, next: NextFunction): void => {
  service
    .findUserById(Number(req.params.id))
    .then(user => res.send(user))
    .catch(err => {
      log.info(`Catched exception in: ${findUser.name} ${module.filename}`);
      next(err);
    });
};

/**
 * PUT /users/id
 * Update user by id.
 */
const updateUser = (req: Request, res: Response, next: NextFunction): void => {
  const userDTO = req.body as UserDTO;
  service
    .updateUser(userDTO)
    .then(() => res.sendStatus(200))
    .catch(err => {
      log.info(`Catched exception in: ${updateUser.name} ${module.filename}`);
      next(err);
    });
};

/**
 * POST /users
 * Create new user.
 */
const createUser = (req: Request, res: Response, next: NextFunction): void => {
  const userDTO = req.body as UserDTO;
  service
    .createUser(userDTO)
    .then(() =>
      res.status(201).send({
        message: "User created."
      })
    )
    .catch(err => {
      log.info(`Catched exception in: ${createUser.name} ${module.filename}`);
      next(err);
    });
};

/**
 * DELETE /users/id
 * Remove user by id.
 */
const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
  const id = Number(req.params.id);
  service
    .removeUser(id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      log.info(`Catched exception in: ${deleteUser.name} ${module.filename}`);
      next(err);
    });
};

/**
 * GET /users/id/groups/
 * Get groups which belongs to this user.
 */
const findUserGroups = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = Number(req.params.id);
  service
    .findUserGroups(userId)
    .then(groups => res.send(groups))
    .catch(err => {
      log.info(
        `Catched exception in: ${findUserGroups.name} ${module.filename}`
      );
      next(err);
    });
};

route.get("/", auth, findAllUsers);
route.get("/:id", auth, findUser);
route.post("/", [auth, validator(userSchema)], createUser);
route.put("/:id", [auth, validator(userSchema)], updateUser);
route.delete("/:id", auth, deleteUser);
route.get("/:id/groups/", auth, findUserGroups);

export default route;
