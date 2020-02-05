import { Sequelize, Model, DataTypes } from "sequelize";
import { BelongsToManyGetAssociationsMixin } from "sequelize";
import Group from "./Group";
import UserGroup from "./UserGroup";

class User extends Model {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: number;

  public getGroups!: BelongsToManyGetAssociationsMixin<Group>;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        login: {
          type: new DataTypes.STRING(20),
          allowNull: false
        },
        password: {
          type: new DataTypes.STRING(20),
          allowNull: false
        },
        age: {
          type: DataTypes.INTEGER
        }
      },
      {
        tableName: "users",
        sequelize: sequelize
      }
    );
  }

  public static associate() {
    this.belongsToMany(Group, {
      as: "Groups",
      through: UserGroup,
      foreignKey: "user_id"
    });
  }
}

export default User;
