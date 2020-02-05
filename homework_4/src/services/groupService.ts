import repository from "../data-access/groupRepository";
import GroupDTO from "../util/dto/GroupDTO";
import Mappers from "./mappers";

const findAllGroups = () =>
  repository.findAllGroups().then(groups => Mappers.mapGroups(groups));

const findGroupById = (groupId: number) =>
  repository.findGroupById(groupId).then(group => Mappers.mapGroup(group));

const removeGroup = (userId: number) => repository.removeGroup(userId);

const updateGroup = (updatedGroup: GroupDTO) =>
  repository.updateGroup(updatedGroup);

const createGroup = (newGroup: GroupDTO) => repository.createGroup(newGroup);

const checkGroupExists = async (id: number) => {
  return findGroupById(id).then(group => {
    return group ? true : false;
  });
};

const addUsersToGroup = (groupId: number, userIds: number[]) => {
  return repository.addUsersToGroup(groupId, userIds);
};

const findGroupUsers = (groupId: number) => {
  return repository
    .findGroupUsers(groupId)
    .then(users => Mappers.mapUsers(users));
};

export default {
  findAllGroups,
  findGroupById,
  removeGroup,
  updateGroup,
  createGroup,
  checkGroupExists,
  addUsersToGroup,
  findGroupUsers
};
