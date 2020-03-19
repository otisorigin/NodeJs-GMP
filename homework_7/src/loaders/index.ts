import expressLoader from './expressLoader';
import sequelize from '../utils/sequelize';
import sequelizeLoader from './sequelizeLoader';
import log from '../utils/winston';

const runLoaders = async (app: any): Promise<void> => {
    await expressLoader(app);
    log.info('Express loaded');
    await sequelizeLoader(sequelize);
    log.info('Sequelize loaded');
};

export default runLoaders;
