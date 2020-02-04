import Group from "../models/Group";
import GroupDTO from "../util/dto/GroupDTO";
import User from "../models/User";
import UserGroup from "../models/UserGroup";



const findAllGroups = () => Group.findAll({ raw: true });

const findGroupById = (groupId: number) => Group.findByPk(groupId);

const removeGroup = (groupId: number) =>
  Group.destroy({ where: { id: groupId } });

const updateGroup = (updatedGroup: GroupDTO) =>
  Group.findByPk(updatedGroup.id).then(group => {
    group.update(updatedGroup);
  });

const createGroup = (newGroup: GroupDTO) => Group.create(newGroup);

const addUsersToGroup = (groupId: number, userIds: number[]) => {
  Group.findByPk(groupId).then(group => {
    group.addUsers(userIds);
  });
  //Group.addUser( {id: userIds[0]});
  // Group.addUser(user, { through: { status: 'started' }})
}

export default {
  findAllGroups,
  findGroupById,
  removeGroup,
  createGroup,
  updateGroup,
  addUsersToGroup
};
