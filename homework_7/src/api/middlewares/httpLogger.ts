import { Request, NextFunction, Response } from 'express';
import log from '../../utils/winston';

const httpLogger = (req: Request, res: Response, next: NextFunction): void => {
    res.on('finish', () => {
        log.info('API request.', {
            module: 'core',
            data: {
                req: {
                    method: req.method,
                    originalUrl: req.originalUrl,
                    url: req.url,
                    ip: req.ip
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
