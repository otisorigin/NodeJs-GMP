import { Sequelize, Model, DataTypes } from "sequelize";

class UserGroup extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
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
}

export default UserGroup;
