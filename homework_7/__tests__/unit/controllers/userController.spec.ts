import userController from "../../../src/api/controllers/userController";
import {
  findAllUsers,
  findAllUsersWithParameters,
  updateUser,
  createUser,
  findUserById,
  removeUser,
  findUserGroups
} from "../../../src/services/userService";
import { Request, NextFunction } from "express";
import UserDTO from "../../../src/types/dto/UserDTO";
import GroupDTO from "../../../src/types/dto/GroupDTO";

const testUser = new UserDTO(1, "TEST_NAME", "TEST_PASSWORD", 19);
const testGroup = new GroupDTO(1, "TEST_GROUP", []);
const error = new Error("TEST ERROR");

jest.mock("../../../src/services/userService", () => ({
  findAllUsers: jest
    .fn()
    .mockImplementationOnce(() => [testUser])
    .mockImplementationOnce(() => {
      throw error;
    }),
  findAllUsersWithParameters: jest.fn().mockImplementation(() => []),
  updateUser: jest
    .fn()
    .mockImplementationOnce(() => testUser)
    .mockImplementationOnce(() => {
      throw error;
    }),
  createUser: jest
    .fn()
    .mockImplementationOnce(() => [testUser])
    .mockImplementationOnce(() => {
      throw error;
    }),
  findUserById: jest
    .fn()
    .mockImplementationOnce(() => testUser)
    .mockImplementationOnce(() => {
      throw error;
    }),
  removeUser: jest
    .fn()
    .mockImplementationOnce(() => testUser)
    .mockImplementationOnce(() => {
      throw error;
    }),
  findUserGroups: jest
    .fn()
    .mockImplementationOnce(() => [testGroup])
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

describe("Find all Users", () => {
  test("Find all users without parameters", async () => {
    await userController.findAllUsers(mockRequest, mockResponse, mockNext);
    expect(findAllUsers).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith([testUser]);
  });
  test("Find all users without parameters throw error", async () => {
    await userController.findAllUsers(mockRequest, mockResponse, mockNext);
    expect(findAllUsers).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(error);
  });
  test("Find all users with parameters", async () => {
    const mockRequestWithParam: any = {
      body: {
        loginSubstring: "str",
        limit: 5
      }
    } as Request;

    await userController.findAllUsers(
      mockRequestWithParam,
      mockResponse,
      mockNext
    );
    expect(findAllUsersWithParameters).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});

describe("Update user", () => {
  mockRequest.body = testUser;
  test("Successful user update", async () => {
    await userController.updateUser(mockRequest, mockResponse, mockNext);
    expect(updateUser).toHaveBeenCalledWith(testUser);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
  test("Throw error", async () => {
    await userController.updateUser(mockRequest, mockResponse, mockNext);
    expect(updateUser).toHaveBeenCalledWith(testUser);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Create user", () => {
  mockRequest.body = testUser;
  test("Successful user create", async () => {
    await userController.createUser(mockRequest, mockResponse, mockNext);
    expect(createUser).toHaveBeenCalledWith(testUser);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
  test("Throw error", async () => {
    await userController.createUser(mockRequest, mockResponse, mockNext);
    expect(createUser).toHaveBeenCalledWith(testUser);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Find user", () => {
  mockRequest.params.id = 1;
  test("Successfully found user", async () => {
    await userController.findUser(mockRequest, mockResponse, mockNext);
    expect(findUserById).toHaveBeenCalledWith(1);
    expect(mockResponse.send).toHaveBeenCalledWith(testUser);
  });
  test("Throw error", async () => {
    await userController.findUser(mockRequest, mockResponse, mockNext);
    expect(findUserById).toHaveBeenCalledWith(1);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Delete user", () => {
  mockRequest.params.id = 1;
  test("Successfully deleted user", async () => {
    await userController.deleteUser(mockRequest, mockResponse, mockNext);
    expect(removeUser).toHaveBeenCalledWith(1);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
  test("Throw error", async () => {
    await userController.deleteUser(mockRequest, mockResponse, mockNext);
    expect(removeUser).toHaveBeenCalledWith(1);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe("Find user groups", () => {
  mockRequest.params.id = 1;
  test("Successfully found user groups", async () => {
    await userController.findUserGroups(mockRequest, mockResponse, mockNext);
    expect(findUserGroups).toHaveBeenCalledWith(1);
    expect(mockResponse.send).toHaveBeenCalledWith([testGroup]);
  });
  test("Throw error", async () => {
    await userController.findUserGroups(mockRequest, mockResponse, mockNext);
    expect(findUserGroups).toHaveBeenCalledWith(1);
    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
