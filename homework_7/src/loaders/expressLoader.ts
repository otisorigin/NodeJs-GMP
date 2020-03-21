import bodyParser from 'body-parser';
import validationErrorsMiddleware from '../api/middlewares/validationErrorsHandler';
import errorsMiddleware from '../api/middlewares/errorsHandler';
import httpLogger from '../api/middlewares/httpLogger';
import controllers from '../api/controllers';
import log from '../utils/winston';
import cors from 'cors';
import express from 'express';

const expressLoader = async (app: express.Application): Promise<void> => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(httpLogger);
    app.use('/api', controllers);
    app.use(validationErrorsMiddleware);
    app.use(errorsMiddleware);
    app.on('uncaughtException', error => log.error(error.stack));
    app.on('unhandledRejection', error => log.warn(error.stack));
};

export default expressLoader;
