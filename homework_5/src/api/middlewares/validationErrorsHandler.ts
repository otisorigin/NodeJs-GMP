import { NextFunction, Request, Response } from 'express';

const handledExceptions = new Map([
    ['EntityNotFoundException', 404],
    ['EntityAlreadyExistsException', 400],
    ['ValidationException', 400]
]);

const validationErrorsHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const errorName = error.constructor.name.toString();
    let status = handledExceptions.get(errorName);
    if (!status) {
       next(error);
    }
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message
    });
};

export default validationErrorsHandler;
