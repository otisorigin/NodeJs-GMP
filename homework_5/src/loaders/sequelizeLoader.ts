import User from '../models/User';
import Group from '../models/Group';
import log from './winston';
import sequelize from './sequelize';

const sequelizeAuthenticate = (): void => {
    sequelize
        .authenticate()
        .then(() =>
            log.info('Connection to the database has been established successfully.')
        )
        .catch(error => {
            log.warn('Unable to connect to the database:');
            Promise.reject(error);
        });
};

const sequelizeModelsInit = (): void => {
    const models = [User, Group];
    models.forEach(model => model.initialize(sequelize));
    models.forEach(model => model.associate());
};

const sequelizeSync = (): void => {
    sequelize
        .sync()
        .then(() => log.info('Models synchronized successfully.'))
        .catch(err => {
            log.warn("Can't connect to sql server.");
            Promise.reject(err);
        });
};

const load = (): void => {
    sequelizeAuthenticate();
    sequelizeModelsInit();
    sequelizeSync();
};

export default load;
