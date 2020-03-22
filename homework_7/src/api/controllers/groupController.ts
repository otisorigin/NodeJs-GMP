import { Router, Request, Response, NextFunction } from 'express';
import * as service from '../../services/groupService';
import GroupDTO from '../../types/dto/GroupDTO';
import log from '../../utils/winston';
import auth from '../middlewares/tokenValidator';
import { access } from 'fs';

const route = Router();

// /**
//  * GET /groups/
//  * Get all groups.
//  */
const findAllGroups = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const groups = await service.findAllGroups();
        res.send(groups);
    } catch (err) {
        log.info(`Catched exception in: ${findAllGroups.name} ${module.filename}`);
        next(err);
    }
};

// /**
//  * GET /groups/id
//  * Get group by id.
//  */
const findGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const group = await service.findGroupById(Number(req.params.id));
        res.send(group);
    } catch (err) {
        log.info(`Catched exception in: ${findGroup.name} ${module.filename}`);
        next(err);
    }
};

// /**
//  * PUT /groups/id
//  * Update group by id.
//  */
const updateGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const groupDTO = req.body as GroupDTO;
    try {
        await service.updateGroup(groupDTO);
        res.sendStatus(200);
    } catch (err) {
        log.info(`Catched exception in: ${updateGroup.name} ${module.filename}`);
        next(err);
    }
};

// /**
//  * POST /groups
//  * Create new group.
//  */
const createGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const groupDTO = req.body as GroupDTO;
    try {
        await service.createGroup(groupDTO);
        res.status(201).send({
            message: 'Group created.'
        });
    } catch (err) {
        log.info(`Catched exception in: ${createGroup.name} ${module.filename}`);
        next(err);
    }
};

// /**
//  * DELETE /groups/id
//  * Remove group by id.
//  */
const deleteGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await service.removeGroup(Number(req.params.id));
        res.sendStatus(200);
    } catch (err) {
        log.info(`Catched exception in: ${deleteGroup.name} ${module.filename}`);
        next(err);
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
): Promise<void> => {
    const userIds = req.body.users as number[];
    try {
        await service.addUsersToGroup(Number(req.params.id), userIds);
        res.sendStatus(200);
    } catch (err) {
        log.info(
            `Catched exception in: ${addUsersToGroup.name} ${module.filename}`
        );
        next(err);
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
): Promise<void> => {
    try {
        const users = await service.findGroupUsers(Number(req.params.id));
        res.send(users);
    } catch (err) {
        log.info(`Catched exception in: ${findGroupUsers.name} ${module.filename}`);
        next(err);
    }
};

route.get('/', auth, findAllGroups);
route.get('/:id', auth, findGroup);
route.post('/', auth, createGroup);
route.put('/:id', auth, updateGroup);
route.delete('/:id', auth, deleteGroup);
route.post('/:id/users/', auth, addUsersToGroup);
route.get('/:id/users/', auth, findGroupUsers);

export default {
    route,
    findGroup,
    findAllGroups,
    findGroupUsers,
    createGroup,
    updateGroup,
    deleteGroup,
    addUsersToGroup
};
