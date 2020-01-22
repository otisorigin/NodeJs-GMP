import repository from "../data-access/UserRepository";
import User from "../models/User";

const findAllUsers = () => repository.findAllUsers();

const findUserById = (userId: number) => repository.findUserById(userId);

const removeUser = (userId: number) => repository.removeUser(userId);

const updateUser = (newUser: User) => repository.updateUser(newUser);

const createUser = (newUser: User) => repository.createUser(newUser);

export default { findAllUsers, findUserById, removeUser, updateUser, createUser };
