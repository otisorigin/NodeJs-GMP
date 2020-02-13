import { Response } from 'express';
import HttpException from '../../util/exceptions/HttpException';

const errorHandler = (error: HttpException, res: Response): void => {
    console.log('Error handling');
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.log('message', error.message);
    res.status(status).send({
        status,
        message
    });
};

export default errorHandler;
