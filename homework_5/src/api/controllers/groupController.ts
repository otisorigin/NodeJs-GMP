import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../../services/groupService';
import GroupDTO from '../../util/dto/GroupDTO';

const route = Router();

// /**
//  * GET /groups/
//  * Get all groups.
//  */
const findAllGroups = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    service
        .findAllGroups()
        .then(groups => res.send(groups))
        .catch(err => next(err));
};

// /**
//  * GET /groups/id
//  * Get group by id.
//  */
const findGroup = (req: Request, res: Response, next: NextFunction): void => {
    service
        .findGroupById(Number(req.params.id))
        .then(group => res.send(group))
        .catch(err => next(err));
};

// /**
//  * PUT /groups/id
//  * Update group by id.
//  */
const updateGroup = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const groupDTO = req.body as GroupDTO;
    service
        .updateGroup(groupDTO)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
};

// /**
//  * POST /groups
//  * Create new group.
//  */
const createGroup = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const groupDTO = req.body as GroupDTO;
    service
        .createGroup(groupDTO)
        .then(() =>
            res.status(201).send({
                message: 'Group created.'
            })
        )
        .catch(err => next(err));
};

// /**
//  * DELETE /groups/id
//  * Remove group by id.
//  */
const deleteGroup = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const id = Number(req.params.id);
    service
        .removeGroup(id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
};

// /**
//  * POST /groups/id/users
//  * Add users in group by ids.
//  */
const addUsersToGroup = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const groupId = Number(req.params.id);
    const userIds = req.body.users as number[];
    service
        .addUsersToGroup(groupId, userIds)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
};

// /**
//  * GET /groups/id/users
//  * Find users which belongs to this group.
//  */
const findGroupUsers = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const groupId = Number(req.params.id);
    service
        .findGroupUsers(groupId)
        .then(users => res.send(users))
        .catch(err => next(err));
};

route.get('/', findAllGroups);
route.get('/:id', findGroup);
route.post('/', createGroup);
route.put('/:id', updateGroup);
route.delete('/:id', deleteGroup);
route.post('/:id/users/', addUsersToGroup);
route.get('/:id/users/', findGroupUsers);

export default route;
