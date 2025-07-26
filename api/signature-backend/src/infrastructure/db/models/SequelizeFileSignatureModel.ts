import { sequelize } from "../../config/database";
import { DataTypes, Model, Optional } from "sequelize";

export interface FileSignatureAtributes {
  id?: number;
  fileId: number;
  userId: number;
  keyId: number;
  signature: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SequelizeFileSignatureCreationAttributes
  extends Optional<FileSignatureAtributes, "id"> {}

export interface SequelizeFileSignatureInstance
  extends Model<
      FileSignatureAtributes,
      SequelizeFileSignatureCreationAttributes
    >,
    FileSignatureAtributes {}

export const SequelizeFileSignatureModel =
  sequelize.define<SequelizeFileSignatureInstance>(
    "SequelizeFileSignatureModel",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      signature: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      keyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "key_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      fileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "file_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "file_signatures", timestamps: true }
  );
