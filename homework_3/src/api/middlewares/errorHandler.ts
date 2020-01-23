import { NextFunction, Request, Response } from "express";
import HttpException from "../../util/HttpException";

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error handling");
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  console.log("message", error.message);
  res.status(status).send({
    status,
    message
  });
};

export default errorHandler;
