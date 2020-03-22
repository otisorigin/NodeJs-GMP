import groupController from "../../../src/api/controllers/groupController";
import {
  findAllGroups,
  updateGroup,
  createGroup,
  findGroupById,
  removeGroup,
  findGroupUsers,
  addUsersToGroup
} from "../../../src/services/groupService";
import { Request, NextFunction } from "express";
import UserDTO from "../../../src/types/dto/UserDTO";
import GroupDTO from "../../../src/types/dto/GroupDTO";

const testUser = new UserDTO(1, "TEST_NAME", "TEST_PASSWORD", 19);
const testGroup = new GroupDTO(1, "TEST_GROUP", []);
const error = new Error("TEST ERROR");

jest.mock("../../../src/services/groupService", () => ({
  findAllGroups: jest
    .fn()
    .mockImplementationOnce(() => [testGroup])
    .mockImplementationOnce(() => {
      throw error;
    }),
  updateGroup: jest
    .fn()
    .mockImplementationOnce(() => testGroup)
    .mockImplementationOnce(() => {
      throw error;
    }),
  createGroup: jest
    .fn()
    .mockImplementationOnce(() => testGroup)
    .mockImplementationOnce(() => {
      throw error;
    }),
  findGroupById: jest
    .fn()
    .mockImplementationOnce(() => testGroup)
    .mockImplementationOnce(() => {
      throw error;
    }),
  removeGroup: jest
    .fn()
    .mockImplementationOnce(() => testGroup)
    .mockImplementationOnce(() => {
      throw error;
    }),
  findGroupUsers: jest
    .fn()
    .mockImplementationOnce(() => [testUser])
    .mockImplementationOnce(() => {
      throw error;
    }),
  addUsersToGroup: jest
    .fn()
    .mockImplementationOnce(() => {})
    .mockImplementationOnce(() => {
      throw error;
    })
}));

const mockResponse: any = {
  send: jest.fn().mockReturnValue(this),
  sendStatus: jest.fn().mockReturnValue(this),
  status: jest.fn().mockReturnValue(this)
};

const mockNext: NextFunction = jest.fn();

const mockRequest: any = {
  body: {},
  params: {}
} as Request;

beforeEach(jest.clearAllMocks);
afterAll(jest.restoreAllMocks);

describe("Find all Groups", () => {
  test("Find all groups", async () => {
    await groupController.findAllGroups(mockRequest, mockResponse, mockNext);
    expect(findAllGroups).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith([testGroup]);
  });
  test("Throw error", async () => {
    await groupController.findAllGroups(mockRequest, mockResponse, mockNext);
    expect(findAllGroups).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Update group", () => {
  mockRequest.body = testGroup;
  test("Successful group update", async () => {
    await groupController.updateGroup(mockRequest, mockResponse, mockNext);
    expect(updateGroup).toHaveBeenCalledWith(testGroup);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
  test("Throw error", async () => {
    await groupController.updateGroup(mockRequest, mockResponse, mockNext);
    expect(updateGroup).toHaveBeenCalledWith(testGroup);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Create group", () => {
  mockRequest.body = testGroup;
  test("Successful group create", async () => {
    await groupController.createGroup(mockRequest, mockResponse, mockNext);
    expect(createGroup).toHaveBeenCalledWith(testGroup);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
  test("Throw error", async () => {
    await groupController.createGroup(mockRequest, mockResponse, mockNext);
    expect(createGroup).toHaveBeenCalledWith(testGroup);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Find group", () => {
  mockRequest.params.id = 1;
  test("Successfully found group", async () => {
    await groupController.findGroup(mockRequest, mockResponse, mockNext);
    expect(findGroupById).toHaveBeenCalledWith(1);
    expect(mockResponse.send).toHaveBeenCalledWith(testGroup);
  });
  test("Throw error", async () => {
    await groupController.findGroup(mockRequest, mockResponse, mockNext);
    expect(findGroupById).toHaveBeenCalledWith(1);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Delete group", () => {
  mockRequest.params.id = 1;
  test("Successfully deleted grou[", async () => {
    await groupController.deleteGroup(mockRequest, mockResponse, mockNext);
    expect(removeGroup).toHaveBeenCalledWith(1);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
  test("Throw error", async () => {
    await groupController.deleteGroup(mockRequest, mockResponse, mockNext);
    expect(removeGroup).toHaveBeenCalledWith(1);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Find group users", () => {
  mockRequest.params.id = 1;
  test("Successfully found group users", async () => {
    await groupController.findGroupUsers(mockRequest, mockResponse, mockNext);
    expect(findGroupUsers).toHaveBeenCalledWith(1);
    expect(mockResponse.send).toHaveBeenCalledWith([testUser]);
  });
  test("Throw error", async () => {
    await groupController.findGroupUsers(mockRequest, mockResponse, mockNext);
    expect(findGroupUsers).toHaveBeenCalledWith(1);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Add users to group", () => {
  mockRequest.params.id = 1;
  mockRequest.body.users = [1];
  test("Successfully added users to group", async () => {
    await groupController.addUsersToGroup(mockRequest, mockResponse, mockNext);
    expect(addUsersToGroup).toHaveBeenCalledWith(1, [1]);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
  test("Throw error", async () => {
    await groupController.addUsersToGroup(mockRequest, mockResponse, mockNext);
    expect(addUsersToGroup).toHaveBeenCalledWith(1, [1]);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
