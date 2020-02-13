import * as repository from '../data-access/groupRepository';
import GroupDTO from '../util/dto/GroupDTO';
import Mappers from './mappers';
import UserDTO from '../util/dto/UserDTO';

export const findAllGroups = (): Promise<GroupDTO[]> =>
    repository.findAllGroups().then(groups => Mappers.mapGroups(groups));

export const findGroupById = (groupId: number): Promise<GroupDTO> =>
    repository.findGroupById(groupId).then(group => Mappers.mapGroup(group));

export const removeGroup = (userId: number): Promise<number> =>
    repository.removeGroup(userId);

export const updateGroup = (updatedGroup: GroupDTO): Promise<GroupDTO> =>
    repository.updateGroup(updatedGroup);

export const createGroup = (newGroup: GroupDTO): Promise<GroupDTO> =>
    repository.createGroup(newGroup);

export const checkGroupExists = async (id: number): Promise<boolean> => {
    return repository.findGroupById(id).then(group => {
        return !!group;
    });
};

export const addUsersToGroup = (
    groupId: number,
    userIds: number[]
): Promise<void> => {
    return repository.addUsersToGroup(groupId, userIds);
};

export const findGroupUsers = (groupId: number): Promise<UserDTO[]> => {
    return repository
        .findGroupUsers(groupId)
        .then(users => Mappers.mapUsers(users));
};
