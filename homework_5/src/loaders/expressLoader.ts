import bodyParser from 'body-parser';
import validationErrorsMiddleware from '../api/middlewares/validationErrorsHandler';
import errorsMiddleware from '../api/middlewares/errorsHandler';
import controllers from '../api/controllers';
import httpLogger from '../api/middlewares/httpLogger';
import log from './winston';

const expressLoader = (app: any): void => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(httpLogger);
    app.use('/api', controllers);
    app.use(validationErrorsMiddleware);
    app.use(errorsMiddleware);
    app.on('uncaughtException', (error: Error) => log.error(error.stack));
    app.on('unhandledRejection', (error: Error) => log.warn(error.stack));
};

export default expressLoader;
