import User from "../models/User";

const findAllUsers = () =>
  User.findAll({ raw: true }).catch(err => console.log(err));

const findUserById = (userId: number) =>
  User.findByPk(userId).catch(err => console.log(err));

const removeUser = (userId: number) =>
  User.destroy({ where: { id: userId } }).catch(err => console.log(err));

const updateUser = (newUser: User) =>
  User.findByPk(newUser.id)
    .then(user => {
      user.update({
        login: newUser.login,
        password: newUser.password,
        age: newUser.age
      });
    })
    .catch(err => console.log(err));

const createUser = (newUser: User) =>
  User.create(newUser).catch(err => console.log(err));

export default {
  findAllUsers,
  findUserById,
  removeUser,
  updateUser,
  createUser
};
