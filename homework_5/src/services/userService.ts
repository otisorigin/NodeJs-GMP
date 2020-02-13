import * as repository from "../data-access/userRepository";
import UserDTO from "../util/dto/UserDTO";
import Mappers from "./mappers";
import GroupDTO from "../util/dto/GroupDTO";

const sortUsers = (users: UserDTO[]): UserDTO[] => {
  return users.sort((a: UserDTO, b: UserDTO) => (a.login > b.login ? 1 : -1));
};

export const findAllUsers = (): Promise<UserDTO[]> =>
  repository
    .findAllUsers()
    .then(users => Mappers.mapUsers(users))
    .then(users => sortUsers(users));

export const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
): Promise<UserDTO[]> =>
  repository
    .findAllUsersWithParameters(userLimit, loginSubstring)
    .then(users => Mappers.mapUsers(users))
    .then(users => sortUsers(users));

export const findUserById = (userId: number): Promise<UserDTO> =>
  repository.findUserById(userId).then(user => Mappers.mapUser(user));

export const removeUser = (userId: number): Promise<number> =>
  repository.removeUser(userId);

export const updateUser = (newUser: UserDTO): Promise<UserDTO> =>
  repository.updateUser(newUser);

export const createUser = (newUser: UserDTO): Promise<UserDTO> =>
  repository.createUser(newUser);

export const findUserGroups = (userId: number): Promise<GroupDTO[]> => {
  return repository
    .findUserGroups(userId)
    .then(groups => Mappers.mapGroups(groups));
};

export const checkUserExists = async (id: number): Promise<boolean> => {
  return repository.findUserById(id).then(user => {
    return !!user;
  });
};
