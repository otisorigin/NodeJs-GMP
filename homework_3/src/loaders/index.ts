import expressLoader from './express';
import sequelizeLoader from './sequelize';

//TODO сделать DI?
const runLoaders = (app : any) => {
    expressLoader(app);
    console.log("Express loaded");
    sequelizeLoader();
    console.log("Sequelize loaded");
}

export default runLoaders;