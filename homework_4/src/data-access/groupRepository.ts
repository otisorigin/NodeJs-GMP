import Group from "../models/Group";
import GroupDTO from "../util/dto/GroupDTO";

export const findAllGroups = () => Group.findAll({ raw: true });

export const findGroupById = (groupId: number) => Group.findByPk(groupId);

export const removeGroup = (groupId: number) =>
  Group.destroy({ where: { id: groupId } });

export const updateGroup = (updatedGroup: GroupDTO) =>
  Group.findByPk(updatedGroup.id).then(group => group.update(updatedGroup));

export const createGroup = (newGroup: GroupDTO) => Group.create(newGroup);

export const addUsersToGroup = (groupId: number, userIds: number[]) => {
  return Group.findByPk(groupId).then(group => {
    return group.addUsers(userIds);
  });
};

export const findGroupUsers = (groupId: number) => {
  return Group.findByPk(groupId).then(group =>
    group.getUsers()
  );
};
