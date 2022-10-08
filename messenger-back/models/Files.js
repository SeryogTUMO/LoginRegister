import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";
import Messages from "./Messages";
import Users from "./Users";

class Files extends Model {

}

Files.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'files',
  modelName: 'files',
});

Files.belongsTo(Messages, {
  as: 'message',
  foreignKey: 'messageId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Messages.hasMany(Files, {
  as: 'files',
  foreignKey: 'messageId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});


Files.belongsTo(Users, {
  as: 'user',
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Users.hasMany(Files, {
  as: 'files',
  foreignKey: 'userId',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

export default Files
