import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

const exceptionCodes = new Map([
    ['EntityNotFoundException', 404],
    ['EntityAlreadyExistsException', 400],
    ['ValidationException', 400]
]);

const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errorName = error.constructor.name.toString();
    const status = exceptionCodes.get(errorName) || 500;
    const message = error.message || 'Something went wrong';
    console.log(error);
    winston.warn(error);
    res.status(status).send({
        status,
        message
    });
};

export default errorHandler;
