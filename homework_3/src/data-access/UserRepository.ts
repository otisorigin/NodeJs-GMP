import User from "../models/User";
import { Op } from "sequelize";

const findAllUsers = () => User.findAll({ raw: true });

const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
) =>
  User.findAll({
    raw: true,
    limit: userLimit,
    where: { login: { [Op.startsWith]: loginSubstring } }
  });

const findUserById = (userId: number) => User.findByPk(userId);

const removeUser = (userId: number) => User.destroy({ where: { id: userId } });

const updateUser = (newUser: User) =>
  User.findByPk(newUser.id).then(user => {
    user.update({
      login: newUser.login,
      password: newUser.password,
      age: newUser.age
    });
  });

const createUser = (newUser: User) => User.create(newUser);

export default {
  findAllUsers,
  findAllUsersWithParameters,
  findUserById,
  removeUser,
  updateUser,
  createUser
};
