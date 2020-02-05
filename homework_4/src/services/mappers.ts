import GroupDTO from "../util/dto/GroupDTO";
import Group from "../models/Group";
import UserDTO from "../util/dto/userDTO";
import User from "../models/User";

const mapGroups = (groups: Group[]) => {
  return groups.map(group => mapGroup(group));
};

const mapGroup = (group: Group) => {
  return new GroupDTO(group.id, group.name, group.permissions);
};

const mapUsers = (users: User[]) => {
  return users.map(user => mapUser(user));
};

const mapUser = (user: User) => {
  return new UserDTO(user.id, user.login, user.password, user.age);
};

export default {mapGroup, mapGroups, mapUser, mapUsers}