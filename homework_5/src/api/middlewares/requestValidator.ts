import Joi from 'joi';
import HttpException from '../../util/exceptions/HttpException';
import { Request, NextFunction } from 'express';

const validator = (schema: any): any => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const { error } = Joi.validate(req.body, schema);
        const valid = error === null;
        if (valid) {
            return next();
        }
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        console.log('error', message);
        return next(new HttpException(message, 400));
    };
};

export default validator;
