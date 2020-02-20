import { Request, NextFunction, Response } from 'express';
import log from '../../loaders/winston';

const httpLogger = (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        log.info('API request.', {
            module: 'core',
            data  : {
                req: {
                    method: req.method,
                    url   : req.url,
                    ip    : req.ip
                },
                res: {
                    statusCode: res.statusCode
                }
            }
        });
    });
    next();
};

export default httpLogger;
