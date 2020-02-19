import bodyParser from 'body-parser';
import validationErrorsMiddleware from '../api/middlewares/validationErrorsHandler';
import errorsMiddleware from '../api/middlewares/errorsHandler';
import controllers from '../api/controllers';
import log from './winston';
import { NextFunction } from 'express';
import {  Request, Response } from 'express';

const expressLoader = (app: any): void => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     res.on('finish', () => {
    //         log.info('API request.', {
    //             module: 'core',
    //             data  : {
    //                 req: {
    //                     method: req.method,
    //                     url   : req.url,
    //                     ip    : req.ip
    //                 },
    //                 res: {
    //                     statusCode: res.statusCode
    //                 }
    //             }
    //         });
    //     });

    //     next();
    // });
    app.use('/api', controllers);
    app.use(validationErrorsMiddleware);
    app.use(errorsMiddleware);

    app.on('uncaughtException', (error: Error) => log.error(error.stack));
    app.on('unhandledRejection', (error: Error) => log.warn(error.stack));
};

export default expressLoader;
