import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  oauthProvider: string;
  oauthId: string;
  avatarUrl: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export const SequelizeUserModel = sequelize.define<UserInstance>(
  "SequelizeUserModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oauthProvider: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "oauthprovider",
    },
    oauthId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "oauthid",
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "avatarurl",
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
