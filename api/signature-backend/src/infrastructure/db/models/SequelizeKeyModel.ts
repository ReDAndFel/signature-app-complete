import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database";

export class SequelizeKeyModel extends Model {
  public id!: number;
  public alias!: string;
  public publicKey!: string;
}

SequelizeKeyModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicKey: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "llave",
  }
);
