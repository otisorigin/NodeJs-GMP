import { Sequelize } from 'sequelize';
import User from '../models/User';
import Group from '../models/Group';
import log from './winston';

const sequelizeAuthenticate = (sequelize: Sequelize): void => {
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

const sequelizeModelsInit = (sequelize: Sequelize): void => {
    const models = [User, Group];
    models.forEach(model => model.initialize(sequelize));
    models.forEach(model => model.associate());
};

const sequelizeSync = (sequelize: Sequelize): void => {
    sequelize
        .sync()
        .then(() => log.info('Models synchronized successfully.'))
        .catch(err => {
            log.warn("Can't connect to sql server.");
            Promise.reject(err);
        });
};

const load = (sequelize: Sequelize): void => {
    sequelizeAuthenticate(sequelize);
    sequelizeModelsInit(sequelize);
    sequelizeSync(sequelize);
};

export default { load };
