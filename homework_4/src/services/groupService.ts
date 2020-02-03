import repository from "../data-access/groupRepository";
import GroupDTO from "../util/dto/GroupDTO";

const findAllGroups = () =>
  repository
    .findAllGroups()
    .then(groups => groups.map(group => group as GroupDTO));

const findGroupById = (groupId: number) =>
  repository.findGroupById(groupId).then(group => group as GroupDTO);

const removeGroup = (userId: number) => repository.removeGroup(userId);

const updateGroup = (updatedGroup: GroupDTO) =>
  repository.updateGroup(updatedGroup);

const createGroup = (newGroup: GroupDTO) => repository.createGroup(newGroup);

const checkGroupExists = async (id: number) => {
  return findGroupById(id).then(group => {
    return group ? true : false;
  });
};

export default {
  findAllGroups,
  findGroupById,
  removeGroup,
  updateGroup,
  createGroup,
  checkGroupExists
};
