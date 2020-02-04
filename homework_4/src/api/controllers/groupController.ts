import { Router, Request, Response, NextFunction } from "express";
import HttpException from "../../util/exceptions/HttpException";
import service from "../../services/groupService";
import GroupDTO from "../../util/dto/groupDTO";

const route = Router();

// /**
//  * GET /groups/
//  * Get all groups.
//  */
const findAllGroups = (req: Request, res: Response, next: NextFunction) => {
  service
    .findAllGroups()
    .then(groups => sendGroups(groups, res, next))
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
        next(new HttpException("Group not found", 404));
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
  let groupDTO = req.body as GroupDTO;
  const groupExists = await service.checkGroupExists(groupDTO.id);
  if (groupExists) {
    service
      .updateGroup(groupDTO)
      .then(() => res.sendStatus(200))
      .catch(err => {
        next(new HttpException(err.message));
      });
  } else {
    next(new HttpException("Can't find group with such id", 400));
  }
};

// /**
//  * POST /groups
//  * Create new group.
//  */
const createGroup = async (req: Request, res: Response, next: NextFunction) => {
  let groupDTO = req.body as GroupDTO;
  const groupExists = await service.checkGroupExists(groupDTO.id);
  if (!groupExists) {
    service
      .createGroup(groupDTO)
      .then(() =>
        res.status(201).send({
          message: "Group created."
        })
      )
      .catch(err => {
        next(new HttpException(err.message));
      });
  } else {
    next(new HttpException("Group with such id already exists", 400));
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
      .catch(err => {
        next(new HttpException(err.message));
      });
  } else {
    next(new HttpException("Can't find group with such id", 400));
  }
};

const addUsersToGroup = (req: Request, res: Response, next: NextFunction) => {
  const groupId = Number(req.params.id);
  const userIds = req.body.users as number[];
  service.addUsersToGroup(groupId, userIds)
}

const sendGroups = (groups: GroupDTO[], res: Response, next: NextFunction) => {
  console.log(groups);
  if (groups.length != 0) {
    res.send(groups);
  } else {
    next(new HttpException("Groups not found", 404));
  }
};

route.get("/", findAllGroups);
route.get("/:id", findGroup);
route.post("/", createGroup);
route.put("/:id", updateGroup);
route.delete("/:id", deleteGroup);
route.post("/:id/users/", addUsersToGroup)

export default route;
