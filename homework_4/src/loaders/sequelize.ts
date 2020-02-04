import { Sequelize, Model } from "sequelize";
import User from "../models/User";
import Group from "../models/Group";
//import UserGroup from "../models/UserGroup11";

const sequelizeLoader = () => {
  const sequelize = new Sequelize(
    "d6qo402ikvqkmd",
    "tyyxlqklfoagud",
    "68b94e52df0ddfe8958e85d8f05b3e2ab755886991bcf2f388fb85cbf9681165",
    {
      host: "ec2-54-247-181-239.eu-west-1.compute.amazonaws.com",
      port: 5432,
      dialect: "postgres",
      protocol: "postgres",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      dialectOptions: {
        ssl: true
      },
      define: {
        timestamps: false
      }
    }
  );

  sequelize
    .authenticate()
    .then(() =>
      console.log(
        "Connection to the database has been established successfully."
      )
    )
    .catch(error => console.error("Unable to connect to the database:", error));

  let models = [User, Group];
  models.forEach(model => model.initialize(sequelize));

  User.belongsToMany(Group, { as: 'Groups', through: 'user_group', foreignKey: 'userId' });
  Group.belongsToMany(User, { as: 'Users', through: 'user_group', foreignKey: 'groupId' });

  sequelize
    .sync()
    .then(() => console.log("Models synchronized successfully."))
    .catch(err => console.log("Can't synchronize models", err));
};

export default sequelizeLoader;
