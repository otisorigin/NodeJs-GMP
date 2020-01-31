import { Sequelize, Model, DataTypes, ENUM } from "sequelize";

class Group extends Model {
  public id!: number;
  public name!: string;
  public permissions!: string;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: new DataTypes.STRING(20),
          allowNull: false
        },
        permissions: {
          type: ENUM,
          values: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"]
        }
      },
      {
        tableName: "groups",
        sequelize: sequelize
      }
    );
  }
}

export default Group;
