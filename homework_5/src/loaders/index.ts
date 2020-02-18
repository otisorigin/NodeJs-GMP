import expressLoader from './expressLoader';
import sequelize from './sequelize';
import sequelizeLoader from './sequelizeLoader';
import log from './winston';

const runLoaders = (app: any): void => {
    expressLoader(app);
    log.info('Express loaded');
    sequelizeLoader.load(sequelize);
    log.info('Sequelize loaded');
};

export default runLoaders;
