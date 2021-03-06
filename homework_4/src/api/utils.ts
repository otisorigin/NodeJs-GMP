import { Response, NextFunction } from "express";
import HttpException from "../util/exceptions/HttpException";
import UserDTO from "../util/dto/UserDTO";
import GroupDTO from "../util/dto/GroupDTO";

const sendUsers = (users: UserDTO[], res: Response, next: NextFunction) => {
  if (users.length != 0) {
    res.send(users);
  } else {
    next(new HttpException("Users not found", 404));
  }
};

const sendGroups = (groups: GroupDTO[], res: Response, next: NextFunction) => {
  if (groups.length != 0) {
    res.send(groups);
  } else {
    next(new HttpException("Groups not found", 404));
  }
};

export default { sendUsers, sendGroups };
