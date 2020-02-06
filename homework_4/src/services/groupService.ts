import * as repository from "../data-access/groupRepository";
import GroupDTO from "../util/dto/GroupDTO";
import Mappers from "./mappers";

export const findAllGroups = () =>
  repository.findAllGroups().then(groups => Mappers.mapGroups(groups));

export const findGroupById = (groupId: number) =>
  repository.findGroupById(groupId).then(group => Mappers.mapGroup(group));

export const removeGroup = (userId: number) => repository.removeGroup(userId);

export const updateGroup = (updatedGroup: GroupDTO) =>
  repository.updateGroup(updatedGroup);

  export const createGroup = (newGroup: GroupDTO) => repository.createGroup(newGroup);

  export const checkGroupExists = async (id: number) => {
  return repository.findGroupById(id).then(group => {
    return group ? true : false;
  });
};

export const addUsersToGroup = (groupId: number, userIds: number[]) => {
  return repository.addUsersToGroup(groupId, userIds);
};

export const findGroupUsers = (groupId: number) => {
  return repository
    .findGroupUsers(groupId)
    .then(users => Mappers.mapUsers(users));
};