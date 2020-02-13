import User from '../models/User';
import Group from '../models/Group';
import { Op } from 'sequelize';
import UserDTO from '../util/dto/UserDTO';

export const findAllUsers = (): Promise<User[]> => User.findAll({ raw: true });

export const findAllUsersWithParameters = (
    userLimit: number,
    loginSubstring: string
): Promise<User[]> =>
    User.findAll({
        raw: true,
        limit: userLimit,
        where: { login: { [Op.startsWith]: loginSubstring } }
    });

export const findUserById = (userId: number): Promise<User> =>
    User.findByPk(userId);

export const removeUser = (userId: number): Promise<number> =>
    User.destroy({ where: { id: userId } });

export const updateUser = (newUser: UserDTO): Promise<User> =>
    User.findByPk(newUser.id).then(user => user.update(newUser));

export const findUserGroups = (userId: number): Promise<Group[]> => {
    return User.findByPk(userId).then(user => user.getGroups());
};

export const createUser = (newUser: UserDTO): Promise<User> =>
    User.create(newUser);
