import expressLoader from './express';
import sequelizeLoader from './sequelize';

const runLoaders = (app : any) => {
    expressLoader(app);
    console.log("Express loaded");
    sequelizeLoader.load();
    console.log("Sequelize loaded");
}

export default runLoaders;