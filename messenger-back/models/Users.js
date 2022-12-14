import { DataTypes, Model } from "sequelize";
import md5 from "md5";
import sequelize from "../services/sequelize";

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
  static hash = (str) => {
    return md5(md5(str) + PASSWORD_SECRET)
  }
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR(32),
    get() {
      return undefined;
    },
    set(val) {
      if (val) {
        this.setDataValue('password', Users.hash(val))
      }
    }
  },
}, {
  sequelize,
  tableName: 'users',
  modelName: 'users',
  indexes: [
    { fields: ['email'], unique: true }
  ]
})

export default Users;
