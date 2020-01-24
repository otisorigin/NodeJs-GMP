import repository from "../data-access/userRepository";
import User from "../models/User";

const findAllUsers = () =>
  repository.findAllUsers().then(users => sortUsers(users));

const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
) =>
  repository
    .findAllUsersWithParameters(userLimit, loginSubstring)
    .then(users => sortUsers(users));

const findUserById = (userId: number) => repository.findUserById(userId);

const removeUser = (userId: number) => repository.removeUser(userId);

const updateUser = (newUser: User) => repository.updateUser(newUser);

const createUser = (newUser: User) => repository.createUser(newUser);

const sortUsers = (users: User[]) => {
  return users.sort((a: User, b: User) => (a.login > b.login ? 1 : -1));
};

export default {
  findAllUsers,
  findAllUsersWithParameters,
  findUserById,
  removeUser,
  updateUser,
  createUser
};
