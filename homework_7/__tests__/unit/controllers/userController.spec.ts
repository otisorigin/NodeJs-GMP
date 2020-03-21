import userController from "../../../src/api/controllers/userController";
import { findAllUsers, updateUser } from "../../../src/services/userService";
import { Request, Response, NextFunction } from "express";
import UserDTO from "../../../src/types/dto/UserDTO";

const testUser = new UserDTO(1, "TEST_NAME", "TEST_PASSWORD", 19);

jest.mock("../../../src/services/userService", () => ({
  findAllUsers: jest.fn().mockImplementation(
    () => new Promise<UserDTO>(() => [testUser])
  ),
  findAllUsersWithParameters: jest.fn().mockImplementation(
    () => new Promise<UserDTO>(() => [])
  ),
  updateUser: jest
    .fn()
    .mockImplementation(() => new Promise<UserDTO>(() => testUser))
}));

const mockResponse: any = {
  send: jest.fn().mockReturnValue(this)
};

const mockNext: NextFunction = jest.fn();

describe("Find all Users", () => {
  test("Find all users without parameters", () => {
    const mockRequest: any = {
      body: {}
    } as Request;

    userController.findAllUsers(mockRequest, mockResponse, mockNext);
    expect(findAllUsers).toHaveBeenCalled();
    // expect(mockResponse.send).toHaveBeenCalled();
    // expect(mockResponse.send).toEqual([testUser]);
  });
});

describe("Update user", () => {
  test("Update user", () => {
    const mockRequest: any = {
      body: testUser
    } as Request;

    userController.updateUser(mockRequest, mockResponse, mockNext);
    expect(updateUser).toHaveBeenCalledWith(testUser);
    // // expect(mockResponse.sendStatus).toHaveBeenCalled();
    // expect(mockResponse.statusCode).toBe(200);
    // //expect(updateUser).toBe(() => mockResponse.sendStatus);
    // expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
});
