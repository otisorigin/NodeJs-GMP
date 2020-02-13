import Group from '../models/Group';
import User from '../models/User';
import GroupDTO from '../util/dto/GroupDTO';
import sequelize from '../loaders/sequelize';

export const findAllGroups = (): Promise<Group[]> => Group.findAll({ raw: true });

export const findGroupById = (groupId: number): Promise<Group> =>
    Group.findByPk(groupId);

export const removeGroup = (groupId: number): Promise<number> =>
    Group.destroy({ where: { id: groupId } });

export const updateGroup = (updatedGroup: GroupDTO): Promise<Group> =>
    Group.findByPk(updatedGroup.id).then(group => group.update(updatedGroup));

export const createGroup = (newGroup: GroupDTO): Promise<Group> =>
    Group.create(newGroup);

export const addUsersToGroup = (
    groupId: number,
    userIds: number[]
): Promise<void> =>
    sequelize.transaction(async t =>
        Group.findByPk(groupId).then(group =>
            group.addUsers(userIds, { transaction: t })
        )
    );

export const findGroupUsers = (groupId: number): Promise<User[]> => {
    return Group.findByPk(groupId).then(group => group.getUsers());
};
