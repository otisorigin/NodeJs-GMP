import * as repository from '../data-access/userRepository';
import UserDTO from '../types/dto/UserDTO';
import Mappers from '../util/mappers';
import GroupDTO from '../types/dto/GroupDTO';
import EntityNotFoundException from '../types/exceptions/EntityNotFoundException';
import EntityAlreadyExistsException from '../types/exceptions/EntityAlreadyExistsException';

const sortUsers = (users: UserDTO[]): UserDTO[] => {
    return users.sort((a: UserDTO, b: UserDTO) => (a.login > b.login ? 1 : -1));
};

export const checkUserExists = async (id: number): Promise<boolean> => {
    return repository.findUserById(id).then(user => !!user);
};

export const findAllUsers = (): Promise<UserDTO[]> =>
    repository
        .findAllUsers()
        .then(users => {
            if (!users) {
                throw new EntityNotFoundException("Can't find any users");
            }
            return Mappers.mapUsers(users);
        })
        .then(users => sortUsers(users));

export const findAllUsersWithParameters = (
    userLimit: number,
    loginSubstring: string
): Promise<UserDTO[]> =>
    repository
        .findAllUsersWithParameters(userLimit, loginSubstring)
        .then(users => {
            if (!users) {
                throw new EntityNotFoundException("Can't find any users");
            }
            return Mappers.mapUsers(users);
        })
        .then(users => sortUsers(users));

export const findUserById = (userId: number): Promise<UserDTO> =>
    repository.findUserById(userId).then(user => {
        if (!user) {
            throw new EntityNotFoundException(`Can't find user with id = ${  userId}`);
        }
        return Mappers.mapUser(user);
    });

export const removeUser = (userId: number): Promise<number> =>
    repository.removeUser(userId).then(user => {
        if (!user) {
            throw new EntityNotFoundException(
                `Can't find user with such id = ${  userId}`
            );
        }
        return user;
    });

export const updateUser = (newUser: UserDTO): Promise<UserDTO> =>
    repository.updateUser(newUser).then(user => {
        if (!user) {
            throw new EntityNotFoundException(
                `Can't find user with such id = ${  newUser.id}`
            );
        }
        return user;
    });

export const createUser = async (newUser: UserDTO): Promise<UserDTO> => {
    const isUserExists = await checkUserExists(newUser.id);
    if (isUserExists) {
        throw new EntityAlreadyExistsException(
            `User with id = ${  newUser.id  } already exists`
        );
    }
    return repository.createUser(newUser);
};

export const findUserGroups = async (userId: number): Promise<GroupDTO[]> => {
    const isUserExists = await checkUserExists(userId);
    if (!isUserExists) {
        throw new EntityNotFoundException(`Can't find user with id = ${  userId}`);
    }
    return repository.findUserGroups(userId).then(groups => {
        if (!groups) {
            throw new EntityNotFoundException("Can't find any groups");
        }
        return Mappers.mapGroups(groups);
    });
};
