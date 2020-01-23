import User from "../models/User";

const findAllUsers = () =>
  User.findAll({ raw: true });

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
  findUserById,
  removeUser,
  updateUser,
  createUser
};
