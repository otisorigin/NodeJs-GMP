import bodyParser from 'body-parser';
import validationErrorsMiddleware from '../api/middlewares/validationErrorsHandler';
import errorsMiddleware from '../api/middlewares/errorsHandler';
import controllers from '../api/controllers';
import log from './winston';

const errorLogger = (error: Error) => {
    log.error(error.name); 
    log.error(error.message);
    log.error(error.stack);
}

const warningLogger = (error: Error) => {
    log.warn(error.name); 
    log.warn(error.message);
    log.warn(error.stack);
}

const expressLoader = (app: any): void => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/api', controllers);
    app.use(validationErrorsMiddleware);
    app.use(errorsMiddleware);
    app.on('uncaughtException', (error: Error) => errorLogger(error));
    app.on('unhandledRejection', (error: Error) => warningLogger(error));
};

export default expressLoader;
