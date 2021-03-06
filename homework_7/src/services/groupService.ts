import * as repository from '../data-access/groupRepository';
import GroupDTO from '../types/dto/GroupDTO';
import Mappers from '../utils/mappers';
import UserDTO from '../types/dto/UserDTO';
import EntityNotFoundException from '../types/exceptions/EntityNotFoundException';
import EntityAlreadyExistsException from '../types/exceptions/EntityAlreadyExistsException';
import { checkUserExists } from './userService';

export const checkGroupExists = async (id: number): Promise<boolean> => {
    return repository.findGroupById(id).then(group => !!group);
};

export const findAllGroups = (): Promise<GroupDTO[]> =>
    repository.findAllGroups().then(groups => {
        if (!groups) {
            throw new EntityNotFoundException("Can't find groups");
        }
        return Mappers.mapGroups(groups);
    });

export const findGroupById = (groupId: number): Promise<GroupDTO> =>
    repository.findGroupById(groupId).then(group => {
        if (!group) {
            throw new EntityNotFoundException(
                `Can't find group with such id = ${groupId}`
            );
        }
        return Mappers.mapGroup(group);
    });

export const removeGroup = async (groupId: number): Promise<number> => {
    const isGroupExists = await checkGroupExists(groupId);
    if (!isGroupExists) {
        throw new EntityNotFoundException(
            `Can't find group with such id = ${groupId}`
        );
    }
    return repository.removeGroup(groupId);
};

export const updateGroup = async (
    updatedGroup: GroupDTO
): Promise<GroupDTO> => {
    const isGroupExists = await checkGroupExists(updatedGroup.id);
    if (!isGroupExists) {
        throw new EntityNotFoundException(
            `Can't find group with such id = ${updatedGroup.id}`
        );
    }
    return repository.updateGroup(updatedGroup);
};

export const createGroup = async (newGroup: GroupDTO): Promise<GroupDTO> => {
    const isGroupExists = await checkGroupExists(newGroup.id);
    if (isGroupExists) {
        throw new EntityAlreadyExistsException(
            `Group with such id = ${newGroup.id}already exists`
        );
    }
    return repository.createGroup(newGroup);
};

export const addUsersToGroup = async (
    groupId: number,
    userIds: number[]
): Promise<void> => {
    const isGroupExists = await checkGroupExists(groupId);
    if (!isGroupExists) {
        throw new EntityNotFoundException(`Can't find group with id = ${groupId}`);
    }
    // TODO добавить проверку на юзеров!!
    return repository.addUsersToGroup(groupId, userIds);
};

export const findGroupUsers = async (groupId: number): Promise<UserDTO[]> => {
    const isGroupExists = await checkGroupExists(groupId);
    if (!isGroupExists) {
        throw new EntityNotFoundException(
            `Can't find group with such id = ${groupId}`
        );
    }
    return repository
        .findGroupUsers(groupId)
        .then(users => Mappers.mapUsers(users));
};
