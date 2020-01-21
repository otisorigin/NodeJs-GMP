import { Sequelize, Model, DataTypes } from "sequelize";

class User extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public age!: number;

    public static initialize(sequelize: Sequelize) {
      this.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        login: {
          type: new DataTypes.STRING(20),
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(20),
          allowNull: false
        },
        age: {
          type: DataTypes.INTEGER
        }
      }, {
        tableName: 'users',
        sequelize: sequelize
      });
  }
}

export default User;
