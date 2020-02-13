import expressLoader from './expressLoader';
import sequelize from './sequelize';
import sequelizeLoader from './sequelizeLoader';

const runLoaders = (app : any) => {
    expressLoader(app);
    console.log('Express loaded');
    sequelizeLoader.load(sequelize);
    console.log('Sequelize loaded');
};

export default runLoaders;
