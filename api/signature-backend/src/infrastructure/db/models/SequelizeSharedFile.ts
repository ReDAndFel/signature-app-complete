import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";

export interface SharedFileAttributes {
  id?: number;
  fileId: number;
  ownerUserId: number;
  sharedWithUserId: number;
}

export interface SharedFileCreationAttributes extends Optional<SharedFileAttributes, "id"> {}

export interface SharedFileInstance extends Model<SharedFileAttributes, SharedFileCreationAttributes>, SharedFileAttributes {}

export const SequelizeSharedFileModel = sequelize.define<SharedFileInstance>(
  "SharedFile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "file_id",
    },
    ownerUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "owner_user_id",
    },
    sharedWithUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "shared_with_user_id",
    },
  },
  {
    tableName: "shared_files",
    timestamps: false,
  }
);
