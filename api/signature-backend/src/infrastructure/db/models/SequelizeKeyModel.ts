// SequelizeKeyModel.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";

export interface KeyAttributes {
  id?: number;
  alias: string;
  publicKey: string;
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
  },
  {
    tableName: "llave",
    timestamps: false,
  }
);
