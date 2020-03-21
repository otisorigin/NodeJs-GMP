import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const tokenValidator = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.headers['x-access-token'] as string;
    if (token) {
        jwt.verify(token, process.env.SECRET_WORD, err => {
            if (err) {
                res.status(403).send({
                    message: 'Invalid token.'
                });
            } else {
                next();
            }
        });
    } else {
        res.status(401).send({
            message: 'No token provided.'
        });
    }
};

export default tokenValidator;
