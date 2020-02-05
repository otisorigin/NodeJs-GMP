import { Sequelize, Model, DataTypes } from "sequelize";
import User from "./User";
import Group from "./Group";

class UserGroup extends Model {
  // public group_id!: number;
  // public user_id!: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        group_id: {
          type: DataTypes.INTEGER,
          primaryKey: false,
          references: {
            model: "group",
            key: "group_id"
          },
          onDelete: "cascade",
          onUpdate: "cascade"
        },
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: false,
          references: {
            model: "user",
            key: "user_id"
          },
          onDelete: "cascade",
          onUpdate: "cascade"
        }
      },
      {
        tableName: "user_group",
        sequelize: sequelize
      }
    );
  }

  public static associate() {
    this.belongsTo(User, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "User"
    });
    this.belongsTo(Group, {
      foreignKey: "group_id",
      targetKey: "id",
      as: "Group"
    });
  }
}

export default UserGroup;
