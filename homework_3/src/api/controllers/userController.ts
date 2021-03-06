import { Router, Request, Response, NextFunction } from "express";
import validator from "../middlewares/requestValidator";
import userSchema from "../../util/schemas/userSchema";
import HttpException from "../../util/exceptions/HttpException";
import service from "../../services/userService";
import UserDTO from "../../util/dto/userDTO";

const route = Router();

/**
 * GET /users/
 * Get all users. In body parameters subLogin and limit.
 */
const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  const loginSubstring = req.body.loginSubstring;
  const limit = req.body.limit;
  if (loginSubstring != undefined && limit != undefined) {
    service
      .findAllUsersWithParameters(limit, loginSubstring)
      .then(users => sendUsers(users, res, next))
      .catch(err => next(new HttpException(err.message)));
  } else {
    service
      .findAllUsers()
      .then(users => sendUsers(users, res, next))
      .catch(err => next(new HttpException(err.message)));
  }
};

/**
 * GET /users/id
 * Get user by id.
 */
const findUser = (req: Request, res: Response, next: NextFunction) => {
  service
    .findUserById(Number(req.params.id))
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        next(new HttpException("User not found", 204));
      }
    })
    .catch(err => {
      next(new HttpException(err.message));
    });
};

/**
 * PUT /users/id
 * Update user by id.
 */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  let userDTO = req.body as UserDTO;
  const userExists = await service.checkUserExists(userDTO.id);
  if (userExists) {
    service
      .updateUser(userDTO)
      .then(() => res.sendStatus(200))
      .catch(err => {
        next(new HttpException(err.message));
      });
  } else {
    next(new HttpException("Can't find user with such id", 400));
  }
};

/**
 * POST /users
 * Create new user.
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  let userDTO = req.body as UserDTO;
  const userExists = await service.checkUserExists(userDTO.id);
  if (!userExists) {
    service
      .createUser(userDTO)
      .then(() =>
        res.status(201).send({
          message: "User created."
        })
      )
      .catch(err => {
        next(new HttpException(err.message));
      });
  } else {
    next(new HttpException("User with such id already exists", 400));
  }
};

/**
 * DELETE /users/id
 * Remove user by id.
 */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const userExists = await service.checkUserExists(id);
  if (userExists) {
    service
      .removeUser(id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        next(new HttpException(err.message));
      });
  } else {
    next(new HttpException("Can't find user with such id", 400));
  }
};

const sendUsers = (users: UserDTO[], res: Response, next: NextFunction) => {
  if (users.length != 0) {
    res.send(users);
  } else {
    next(new HttpException("Users not found", 204));
  }
};

route.get("/", findAllUsers);
route.get("/:id", findUser);
route.post("/", validator(userSchema), createUser);
route.put("/:id", validator(userSchema), updateUser);
route.delete("/:id", deleteUser);

export default route;
