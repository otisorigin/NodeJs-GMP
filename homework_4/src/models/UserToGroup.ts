import { Sequelize, Model } from "sequelize";

class UserToGroup extends Model {
    public static initialize(sequelize: Sequelize) {
        this.init({}, {
          tableName: 'user_to_group',
          sequelize: sequelize
        });
    }
}

export default UserToGroup;