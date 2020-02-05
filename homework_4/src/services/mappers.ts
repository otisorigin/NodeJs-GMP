import GroupDTO from "../util/dto/GroupDTO";
import Group from "../models/Group";
import UserDTO from "../util/dto/userDTO";
import User from "../models/User";

const mapGroups = (groups: Group[]) => {
  return groups.map(group => group as GroupDTO);
};

const mapGroup = (group: Group) => {
  return group as GroupDTO;
};

const mapUsers = (users: User[]) => {
  return users.map(user => user as UserDTO);
};

const mapUser = (user: User) => {
  return user as UserDTO;
};

export default {mapGroup, mapGroups, mapUser, mapUsers}