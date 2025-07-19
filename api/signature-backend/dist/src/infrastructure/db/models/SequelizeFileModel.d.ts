import { Model, Optional } from "sequelize";
export interface FileAttributes {
    id?: number;
    fileName: string;
    hash: string;
    path: string;
    userId?: number;
}
export interface FileCreationAttributes extends Optional<FileAttributes, "id"> {
}
export interface FileInstance extends Model<FileAttributes, FileCreationAttributes>, FileAttributes {
}
export declare const SequelizeFileModel: import("sequelize").ModelCtor<FileInstance>;
