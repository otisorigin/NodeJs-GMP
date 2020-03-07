import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../../services/groupService';
import GroupDTO from '../../types/dto/GroupDTO';
import log from '../../utils/winston';
import auth from '../middlewares/tokenValidator';

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
        .catch(err => {
            log.info(
                `Catched exception in: ${findAllGroups.name} ${module.filename}`
            );
            next(err);
        });
};

// /**
//  * GET /groups/id
//  * Get group by id.
//  */
const findGroup = (req: Request, res: Response, next: NextFunction): void => {
    service
        .findGroupById(Number(req.params.id))
        .then(group => res.send(group))
        .catch(err => {
            log.info(`Catched exception in: ${findGroup.name} ${module.filename}`);
            next(err);
        });
};

// /**
//  * PUT /groups/id
//  * Update group by id.
//  */
const updateGroup = (req: Request, res: Response, next: NextFunction): void => {
    const groupDTO = req.body as GroupDTO;
    service
        .updateGroup(groupDTO)
        .then(() => res.sendStatus(200))
        .catch(err => {
            log.info(`Catched exception in: ${updateGroup.name} ${module.filename}`);
            next(err);
        });
};

// /**
//  * POST /groups
//  * Create new group.
//  */
const createGroup = (req: Request, res: Response, next: NextFunction): void => {
    const groupDTO = req.body as GroupDTO;
    service
        .createGroup(groupDTO)
        .then(() =>
            res.status(201).send({
                message: 'Group created.'
            })
        )
        .catch(err => {
            log.info(`Catched exception in: ${createGroup.name} ${module.filename}`);
            next(err);
        });
};

// /**
//  * DELETE /groups/id
//  * Remove group by id.
//  */
const deleteGroup = (req: Request, res: Response, next: NextFunction): void => {
    const id = Number(req.params.id);
    service
        .removeGroup(id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            log.info(`Catched exception in: ${deleteGroup.name} ${module.filename}`);
            next(err);
        });
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
        .catch(err => {
            log.info(
                `Catched exception in: ${addUsersToGroup.name} ${module.filename}`
            );
            next(err);
        });
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
        .catch(err => {
            log.info(
                `Catched exception in: ${findGroupUsers.name} ${module.filename}`
            );
            next(err);
        });
};

route.get('/', auth, findAllGroups);
route.get('/:id', auth, findGroup);
route.post('/', auth, createGroup);
route.put('/:id', auth, updateGroup);
route.delete('/:id', auth, deleteGroup);
route.post('/:id/users/', auth, addUsersToGroup);
route.get('/:id/users/', auth, findGroupUsers);

export default route;
