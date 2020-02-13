import GroupDTO from '../util/dto/GroupDTO';
import Group from '../models/Group';
import UserDTO from '../util/dto/UserDTO';
import User from '../models/User';

const mapGroup = (group: Group): GroupDTO =>
    new GroupDTO(group.id, group.name, group.permissions);

const mapGroups = (groups: Group[]): GroupDTO[] =>
    groups.map(group => mapGroup(group));

const mapUser = (user: User): UserDTO =>
    new UserDTO(user.id, user.login, user.password, user.age);

const mapUsers = (users: User[]): UserDTO[] => users.map(user => mapUser(user));

export default { mapGroup, mapGroups, mapUser, mapUsers };
