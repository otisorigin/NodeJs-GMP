import repository from "../data-access/userRepository";
import UserDTO from "../util/dto/userDTO";

const findAllUsers = () =>
  repository
    .findAllUsers()
    .then(users => sortUsers(users.map(user => user as UserDTO)));

const findAllUsersWithParameters = (
  userLimit: number,
  loginSubstring: string
) =>
  repository
    .findAllUsersWithParameters(userLimit, loginSubstring)
    .then(users => sortUsers(users.map(user => user as UserDTO)));

const findUserById = (userId: number) =>
  repository.findUserById(userId).then(user => user as UserDTO);

const removeUser = (userId: number) => repository.removeUser(userId);

const updateUser = (newUser: UserDTO) => repository.updateUser(newUser);

const createUser = (newUser: UserDTO) => repository.createUser(newUser);

const sortUsers = (users: UserDTO[]) => {
  return users.sort((a: UserDTO, b: UserDTO) => (a.login > b.login ? 1 : -1));
};

export default {
  findAllUsers,
  findAllUsersWithParameters,
  findUserById,
  removeUser,
  updateUser,
  createUser
};
