import expressLoader from './expressLoader';

import sequelizeLoader from './sequelizeLoader';
import log from './winston';

const runLoaders = (app: any): void => {
    expressLoader(app);
    log.info('Express loaded');
    sequelizeLoader();
    log.info('Sequelize loaded');
};

export default runLoaders;
