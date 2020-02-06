import * as repository from "../data-access/userRepository";
import UserDTO from "../util/dto/userDTO";
import Mappers from "./mappers";

export const findAllUsers = () =>
  repository
    .findAllUsers()
    .then(users => Mappers.mapUsers(users))
    .then(users => sortUsers(users));

export const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
) =>
  repository
    .findAllUsersWithParameters(userLimit, loginSubstring)
    .then(users => Mappers.mapUsers(users))
    .then(users => sortUsers(users));

export const findUserById = (userId: number) =>
  repository.findUserById(userId).then(user => Mappers.mapUser(user));

export const removeUser = (userId: number) => repository.removeUser(userId);

export const updateUser = (newUser: UserDTO) => repository.updateUser(newUser);

export const createUser = (newUser: UserDTO) => repository.createUser(newUser);

export const findUserGroups = (userId: number) => {
  return repository
    .findUserGroups(userId)
    .then(groups => Mappers.mapGroups(groups));
};

export const checkUserExists = async (id: number) => {
  return findUserById(id).then(user => {
    return user ? true : false;
  });
};

const sortUsers = (users: UserDTO[]) => {
  return users.sort((a: UserDTO, b: UserDTO) => (a.login > b.login ? 1 : -1));
};
