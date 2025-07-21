import { sequelize } from "../../config/database";
import { DataTypes, Model, Optional } from "sequelize";

export interface FileSignatureAtributes {
  id?: number;
  fileId: number;
  userId: number;
  keyId: number;
  signature: string;
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
    },
    { tableName: "file_signatures", timestamps: false }
  );
