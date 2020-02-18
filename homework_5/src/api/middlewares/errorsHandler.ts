import { NextFunction, Request, Response } from "express";
import log from "../../loaders/winston";

const errorsHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  log.warn(error.name);
  log.warn(error.message);
  log.warn(error.stack);
  const status = 500;
  const message = error.message || "Something went wrong";
  res.status(status).send({
    status,
    message
  });
};

export default errorsHandler;
