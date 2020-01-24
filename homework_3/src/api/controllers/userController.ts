import User from "../../models/User";
import { Router, Request, Response, NextFunction } from "express";
import validator from "../middlewares/requestValidator";
import userSchema from "../../util/schemas/userSchema";
import HttpException from "../../util/exceptions/HttpException";
import service from "../../services/userService";

const route = Router();

/**
 * GET /users/
 * Get all users. In body parameters subLogin and limit.
 */
const findAllUsers = (req: Request, res: Response) => {
  console.log("findAllUsers");
  //   let availableUsers = users
  //     .filter(user => user.isDeleted == false)
  //     .sort((a, b) => (a.login > b.login ? 1 : -1));
  //   let loginSubstring = req.body.loginSubstring;
  //   let limit = req.body.limit;
  //   if (
  //     availableUsers.length > 0 &&
  //     loginSubstring != undefined &&
  //     limit != undefined
  //   ) {
  //     res.send(
  //       availableUsers
  //         .filter(user => user.login.includes(loginSubstring))
  //         .slice(0, limit)
  //     );
  //   } else {
  //     res.send(availableUsers);
  //   }
};

/**
 * GET /users/id
 * Get user by id.
 */
const findUser = (req: Request, res: Response, next: NextFunction) => {
  service
    .findUserById(Number(req.params.id))
    .then(user => {
      if (user != null) {
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
const updateUser = (req: Request, res: Response) => {
  // const id = Number(req.params.id);
  // const user = service.updateUser(id);
  // if (user == undefined) {
  //   res.sendStatus(204);
  // } else{
  //   user.age = req.body.age;
  //   user.login = req.body.login;
  //   user.password = req.body.password;
  //   res.sendStatus(200);
  // }
};

/**
 * POST /users
 * Create new user.
 */
const createUser = (req: Request, res: Response) => {
  console.log("createUser");
  //   let id = req.body.id;
  //   if (getUserById(id) != undefined) {
  //     res.status(400).send({
  //       error: "User with such id already exists!"
  //     });
  //   } else {
  //     const user = new User(id, req.body.login, req.body.password, req.body.age);
  //     users.push(user);
  //     res.status(201).send({
  //       message: "User created."
  //     });
  //   }
};

/**
 * DELETE /users/id
 * Remove user by id.
 */
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  service.findUserById(id).then(user => {
    if (user == null) {
      next(new HttpException("User not found", 204));
    }
  }).catch(err => {
    next(new HttpException(err.message));
  });
  service
    .removeUser(id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      next(new HttpException(err.message));
    });
};

route.get("/", findAllUsers);
route.get("/:id", findUser);
route.post("/", validator(userSchema), createUser);
route.put("/:id", validator(userSchema), updateUser);
route.delete("/:id", deleteUser);

export default route;
