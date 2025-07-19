import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";

export interface KeyAttributes {
  id?: number;
  alias: string;
  publicKey: string;
  userId: number;
}

export interface KeyCreationAttributes extends Optional<KeyAttributes, "id"> {}

export interface KeyInstance
  extends Model<KeyAttributes, KeyCreationAttributes>,
    KeyAttributes {}

export const SequelizeKeyModel = sequelize.define<KeyInstance>(
  "SequelizeKeyModel",
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
      field: "public_key",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
  },
  {
    tableName: "keys",
    timestamps: false,
  }
);
