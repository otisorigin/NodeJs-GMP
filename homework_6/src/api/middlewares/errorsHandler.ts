import { NextFunction, Request, Response } from 'express';
import log from '../../utils/winston';

const errorsHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const status = 500;
    const message = error.message || 'Something went wrong';
    log.warn(error.stack);
    res.status(status).send({
        status,
        message
    });
};

export default errorsHandler;
