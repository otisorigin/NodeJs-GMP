import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../../util/exceptions/HttpException';
import * as service from '../../services/groupService';
import GroupDTO from '../../util/dto/GroupDTO';
import Utils from '../utils';

const route = Router();

// /**
//  * GET /groups/
//  * Get all groups.
//  */
const findAllGroups = (req: Request, res: Response, next: NextFunction) => {
    service
        .findAllGroups()
        .then(groups => Utils.sendGroups(groups, res, next))
        .catch(err => next(new HttpException(err.message)));
};

// /**
//  * GET /groups/id
//  * Get group by id.
//  */
const findGroup = (req: Request, res: Response, next: NextFunction) => {
    service
        .findGroupById(Number(req.params.id))
        .then(group => {
            if (group) {
                res.send(group);
            } else {
                return next(new HttpException('Group not found', 404));
            }
        })
        .catch(err => {
            next(new HttpException(err.message));
        });
};

// /**
//  * PUT /groups/id
//  * Update group by id.
//  */
const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
    const groupDTO = req.body as GroupDTO;
    const groupExists = await service.checkGroupExists(groupDTO.id);
    if (groupExists) {
        service
            .updateGroup(groupDTO)
            .then(() => res.sendStatus(200))
            .catch(err => {
                next(new HttpException(err.message));
            });
    } else {
        return next(new HttpException("Can't find group with such id", 400));
    }
};

// /**
//  * POST /groups
//  * Create new group.
//  */
const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    const groupDTO = req.body as GroupDTO;
    const groupExists = await service.checkGroupExists(groupDTO.id);
    if (!groupExists) {
        service
            .createGroup(groupDTO)
            .then(() =>
                res.status(201).send({
                    message: 'Group created.'
                })
            )
            .catch(err => next(new HttpException(err.message)));
    } else {
        return next(new HttpException('Group with such id already exists', 400));
    }
};

// /**
//  * DELETE /groups/id
//  * Remove group by id.
//  */
const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const groupExists = await service.checkGroupExists(id);
    if (groupExists) {
        service
            .removeGroup(id)
            .then(() => res.sendStatus(200))
            .catch(err => next(new HttpException(err.message)));
    } else {
        return next(new HttpException("Can't find group with such id", 400));
    }
};

// /**
//  * POST /groups/id/users
//  * Add users in group by ids.
//  */
const addUsersToGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const groupId = Number(req.params.id);
    const userIds = req.body.users as number[];
    const groupExists = await service.checkGroupExists(groupId);
    if (groupExists) {
        service
            .addUsersToGroup(groupId, userIds)
            .then(() => res.sendStatus(200))
            .catch(err => next(new HttpException(err.message)));
    } else {
        return next(new HttpException("Can't find group with such id", 400));
    }
};

// /**
//  * GET /groups/id/users
//  * Find users which belongs to this group.
//  */
const findGroupUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const groupId = Number(req.params.id);
    const groupExists = await service.checkGroupExists(groupId);
    if (groupExists) {
        service
            .findGroupUsers(groupId)
            .then(users => Utils.sendUsers(users, res, next))
            .catch(err => {
                next(new HttpException(err.message));
            });
    } else {
        return next(new HttpException("Can't find group with such id", 400));
    }
};

route.get('/', findAllGroups);
route.get('/:id', findGroup);
route.post('/', createGroup);
route.put('/:id', updateGroup);
route.delete('/:id', deleteGroup);
route.post('/:id/users/', addUsersToGroup);
route.get('/:id/users/', findGroupUsers);

export default route;
