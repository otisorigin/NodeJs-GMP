import repository from "../data-access/userRepository";
import UserDTO from "../util/dto/userDTO";
import Mappers from "./mappers";

const findAllUsers = () =>
  repository
    .findAllUsers()
    .then(users => Mappers.mapUsers(users))
    .then(users => sortUsers(users));

const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
) =>
  repository
    .findAllUsersWithParameters(userLimit, loginSubstring)
    .then(users => Mappers.mapUsers(users))
    .then(users => sortUsers(users));

const findUserById = (userId: number) =>
  repository.findUserById(userId).then(user => Mappers.mapUser(user));

const removeUser = (userId: number) => repository.removeUser(userId);

const updateUser = (newUser: UserDTO) => repository.updateUser(newUser);

const createUser = (newUser: UserDTO) => repository.createUser(newUser);

const sortUsers = (users: UserDTO[]) => {
  return users.sort((a: UserDTO, b: UserDTO) => (a.login > b.login ? 1 : -1));
};

const checkUserExists = async (id: number) => {
  return findUserById(id).then(user => {
    return user ? true : false;
  });
};

export default {
  findAllUsers,
  findAllUsersWithParameters,
  findUserById,
  removeUser,
  updateUser,
  createUser,
  checkUserExists
};
