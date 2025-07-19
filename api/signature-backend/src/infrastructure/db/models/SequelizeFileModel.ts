import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database";
import path from "path";

export interface FileAttributes {
  id?: number;
  fileName: string;
  hash: string;
  path: string;
  userId?: number;
}

export interface FileCreationAttributes
  extends Optional<FileAttributes, "id"> {}

export interface FileInstance
  extends Model<FileAttributes, FileCreationAttributes>,
    FileAttributes {}

export const SequelizeFileModel = sequelize.define<FileInstance>(
    "SequelizeFileModel",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const rawPath = this.getDataValue("path");
                return rawPath ? path.resolve(rawPath) : null;
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            references: {
                model: "users", // Assuming a 'users' table exists
                key: "id",
            }
        }
    },
    { tableName: "archivo", timestamps: false }
);