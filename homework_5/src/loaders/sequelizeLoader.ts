import { Sequelize } from 'sequelize';
import User from '../models/User';
import Group from '../models/Group';

const sequelizeAuthenticate = (sequelize: Sequelize): void => {
    sequelize
        .authenticate()
        .then(() =>
            console.log(
                'Connection to the database has been established successfully.'
            )
        )
        .catch(error => console.error('Unable to connect to the database:', error));
};

const sequelizeModelsInit = (sequelize: Sequelize): void => {
    const models = [User, Group];
    models.forEach(model => model.initialize(sequelize));
    models.forEach(model => model.associate());
};

const sequelizeSync = (sequelize: Sequelize): void => {
    sequelize
        .sync()
        .then(() => console.log('Models synchronized successfully.'))
        .catch(err => console.log("Can't synchronize models", err));
};

const load = (sequelize: Sequelize): void => {
    sequelizeAuthenticate(sequelize);
    sequelizeModelsInit(sequelize);
    sequelizeSync(sequelize);
};

export default { load };
