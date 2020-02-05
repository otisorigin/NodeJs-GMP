import Group from "../models/Group";
import GroupDTO from "../util/dto/GroupDTO";

const findAllGroups = () => Group.findAll({ raw: true });

const findGroupById = (groupId: number) => Group.findByPk(groupId);

const removeGroup = (groupId: number) =>
  Group.destroy({ where: { id: groupId } });

const updateGroup = (updatedGroup: GroupDTO) =>
  Group.findByPk(updatedGroup.id).then(group => group.update(updatedGroup));

const createGroup = (newGroup: GroupDTO) => Group.create(newGroup);

const addUsersToGroup = (groupId: number, userIds: number[]) => {
  return Group.findByPk(groupId).then(group => {
    return group.addUsers(userIds);
  });
};

const findGroupUsers = (groupId: number) => {
  return Group.findByPk(groupId).then(group => group.getUsers());
};

export default {
  findAllGroups,
  findGroupById,
  removeGroup,
  createGroup,
  updateGroup,
  addUsersToGroup,
  findGroupUsers
};
