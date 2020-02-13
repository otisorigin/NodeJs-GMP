import { Sequelize, Model, DataTypes, ENUM,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin
} from 'sequelize';

import User from './User';

class Group extends Model {
  public id!: number;
  public name!: string;
  public permissions!: string[];

  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public addUsers!: BelongsToManyAddAssociationMixin<User, number[]>;

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
                  values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
              }
          },
          {
              tableName: 'groups',
              sequelize
          }
      );
  }

  public static associate() {
      this.belongsToMany(User, {
          as: 'Users',
          through: 'user_group',
          onDelete: 'CASCADE',
          foreignKey: { name: 'group_id', allowNull: false },
          hooks: true
      });
  }
}

export default Group;
