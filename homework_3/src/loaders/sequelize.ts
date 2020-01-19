import { Sequelize } from "sequelize";

const sequelizeLoader = () => {
  const sequelize = new Sequelize(
    "postgres://tyyxlqklfoagud:68b94e52df0ddfe8958e85d8f05b3e2ab755886991bcf2f388fb85cbf9681165@ec2-54-247-181-239.eu-west-1.compute.amazonaws.com:5432/d6qo402ikvqkmd", {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
          ssl: true
      }}
  );
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelizeLoader;
