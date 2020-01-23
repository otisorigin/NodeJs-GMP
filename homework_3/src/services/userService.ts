import repository from "../data-access/userRepository";
import User from "../models/User";
import ServiceError from "../util/ServiceError";

const findAllUsers = () => repository.findAllUsers();

const findUserById = (userId: number): Promise<User> => {
    return repository.findUserById(userId).then(user => {
        if(user == null) {
            throw new ServiceError("Can't find user");
        }
        return user;
    });
};

const removeUser = (userId: number) => repository.removeUser(userId);

const updateUser = (newUser: User) => repository.updateUser(newUser);

const createUser = (newUser: User) => repository.createUser(newUser);

export default {
  findAllUsers,
  findUserById,
  removeUser,
  updateUser,
  createUser
};
