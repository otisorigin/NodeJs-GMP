import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as service from '../../services/userService';
import UnauthorizedException from '../../types/exceptions/UnauthorizedException';
import log from '../../utils/winston';
import validator from '../middlewares/requestValidator';
import authSchema from '../../types/schemas/authSchema';
import UserDTO from '../../types/dto/UserDTO';

const route = Router();

const generateToken = (user: UserDTO): string => {
    const payload = { id: user.id, age: user.age };
    return jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: 30 });
};

const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await service.findUserByLogin(req.body.login);
        if (!user || user.password !== req.body.password) {
            throw new UnauthorizedException('Incorrect login or password');
        } else {
            const token = generateToken(user);
            res.send({ token });
        }
    } catch (err) {
        log.info(`Catched exception in: ${login.name} ${module.filename}`);
        next(err);
    }
};

route.post('/', validator(authSchema), login);

export default login;
