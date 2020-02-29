import { Sequelize } from "sequelize";
import User from "../models/User";
import Group from "../models/Group";
import log from "../util/winston";

const sequelizeAuthenticate = async (sequelize: Sequelize): Promise<void> => {
  try {
    await sequelize.authenticate();
    log.info("Connection to the database has been established successfully.");
  } catch (error) {
    log.warn("Unable to connect to the database:");
    throw new Error(error);
  }
};

const sequelizeModelsInit = async (sequelize: Sequelize): Promise<void> => {
  const models = [User, Group];
  models.forEach(model => model.initialize(sequelize));
  models.forEach(model => model.associate());
};

const sequelizeSync = async (sequelize: Sequelize): Promise<void> => {
  try {
    await sequelize.sync();
    log.info("Models synchronized successfully.");
  } catch (error) {
    log.warn("Can't connect to sql server.");
    throw new Error(error);
  }
};

const load = async (sequelize: Sequelize): Promise<void> => {
  await sequelizeAuthenticate(sequelize);
  await sequelizeModelsInit(sequelize);
  await sequelizeSync(sequelize);
};

export default load;
