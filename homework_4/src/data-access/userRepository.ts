import User from "../models/User";
import { Op } from "sequelize";
import UserDTO from "../util/dto/userDTO";

export const findAllUsers = () => User.findAll({ raw: true });

export const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
) =>
  User.findAll({
    raw: true,
    limit: userLimit,
    where: { login: { [Op.startsWith]: loginSubstring } }
  });

export const findUserById = (userId: number) => User.findByPk(userId);

export const removeUser = (userId: number) =>
  User.destroy({ where: { id: userId } });

export const updateUser = (newUser: UserDTO) =>
  User.findByPk(newUser.id).then(user => user.update(newUser));

export const findUserGroups = (userId: number) => {
  return User.findByPk(userId).then(user => user.getGroups());
};

export const createUser = (newUser: UserDTO) => User.create(newUser);
