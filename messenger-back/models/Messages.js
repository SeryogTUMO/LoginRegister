import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";
import Users from "./Users";

class Messages extends Model {

}

Messages.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('text', 'voice', 'video')
  },
  seen: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  tableName: 'messages',
  modelName: 'messages',
})

Messages.belongsTo(Users, {
  as: 'userFrom',
  foreignKey: 'from',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Messages.belongsTo(Users, {
  as: 'userTo',
  foreignKey: 'to',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});


export default Messages;
