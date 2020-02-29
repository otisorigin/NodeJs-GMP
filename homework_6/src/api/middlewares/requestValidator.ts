import Joi from 'joi';
import { Request, NextFunction } from 'express';
import ValidationException from '../../types/exceptions/ValidationException';

const validator = (schema: any): any => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const { error } = Joi.validate(req.body, schema);
        const valid = error === null;
        if (valid) {
            return next();
        }
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        return next(new ValidationException(message));
    };
};

export default validator;
