import { sequelize } from "../../config/database";
import { DataTypes, Model, Optional } from "sequelize";

export interface FileSignatureAtributes {
    fileId?: number;
    userId: number;
    keyId: number;
    signature: string;
}

export interface SequelizeFileSignatureCreationAttributes
    extends Optional<FileSignatureAtributes, "fileId"> {}

export interface SequelizeFileSignatureInstance
    extends Model<FileSignatureAtributes, SequelizeFileSignatureCreationAttributes>,
        FileSignatureAtributes {}

export const SequelizeFileSignatureModel = sequelize.define<SequelizeFileSignatureInstance>(
    "SequelizeFileSignatureModel",
    {
        signature: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        keyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "key_id"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id"
        },
        fileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            field: "file_id"
        }
    },
    { tableName: "file_signatures", timestamps: false }
)