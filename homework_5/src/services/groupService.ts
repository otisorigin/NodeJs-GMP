import * as repository from '../data-access/groupRepository';
import GroupDTO from '../util/dto/GroupDTO';
import Mappers from './mappers';
import UserDTO from '../util/dto/UserDTO';
import EntityNotFoundException from '../util/exceptions/EntityNotFoundException';
import EntityAlreadyExistsException from '../util/exceptions/EntityAlreadyExistsException';
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
            throw new EntityNotFoundException("Can't find group with such id");
        }
        return Mappers.mapGroup(group);
    });

export const removeGroup = async (groupId: number): Promise<number> => {
    const isGroupExists = await checkGroupExists(groupId);
    if (!isGroupExists) {
        throw new EntityNotFoundException("Can't find group with such id");
    }
    return repository.removeGroup(groupId);
};


export const updateGroup = async (updatedGroup: GroupDTO): Promise<GroupDTO> => {
    const isGroupExists = await checkGroupExists(updatedGroup.id);
    if (!isGroupExists) {
        throw new EntityNotFoundException("Can't find group with such id");
    }
    return repository.updateGroup(updatedGroup);
};

export const createGroup = async (newGroup: GroupDTO): Promise<GroupDTO> => {
    const isGroupExists = await checkGroupExists(newGroup.id);
    if (isGroupExists) {
        throw new EntityAlreadyExistsException('Group with such id already exists');
    }
    return repository.createGroup(newGroup);
};

export const addUsersToGroup = async (
    groupId: number,
    userIds: number[]
): Promise<void> => {
    const isGroupExists = await checkGroupExists(groupId);
    if (!isGroupExists) {
        throw new EntityNotFoundException("Can't find group with such id");
    }
    // TODO добавить проверку на юзеров!!
    return repository.addUsersToGroup(groupId, userIds);
};

export const findGroupUsers = async (groupId: number): Promise<UserDTO[]> => {
    const isGroupExists = await checkGroupExists(groupId);
    if (!isGroupExists) {
        throw new EntityNotFoundException("Can't find group with such id");
    }
    return repository
        .findGroupUsers(groupId)
        .then(users => Mappers.mapUsers(users));
};
