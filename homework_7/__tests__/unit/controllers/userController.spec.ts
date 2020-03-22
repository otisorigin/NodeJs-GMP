import userController from "../../../src/api/controllers/userController";
import {
  findAllUsers,
  findAllUsersWithParameters,
  updateUser
} from "../../../src/services/userService";
import { Request, Response, NextFunction } from "express";
import UserDTO from "../../../src/types/dto/UserDTO";

const testUser = new UserDTO(1, "TEST_NAME", "TEST_PASSWORD", 19);
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
    .mockImplementation(() => new Promise<UserDTO>(() => testUser))
}));

const mockResponse: any = {
  send: jest.fn().mockReturnValue(this)
};

const mockNext: NextFunction = jest.fn();

const mockRequest: any = {
  body: {}
} as Request;

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
    expect(mockResponse.send).toHaveBeenCalledWith([testUser]);
  });
});

describe("Update user", () => {
  test("Update user", () => {
    const mockRequestWithUser: any = {
      body: testUser
    } as Request;

    userController.updateUser(mockRequestWithUser, mockResponse, mockNext);
    expect(updateUser).toHaveBeenCalledWith(testUser);
    // // expect(mockResponse.sendStatus).toHaveBeenCalled();
    // expect(mockResponse.statusCode).toBe(200);
    // //expect(updateUser).toBe(() => mockResponse.sendStatus);
    // expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
});
