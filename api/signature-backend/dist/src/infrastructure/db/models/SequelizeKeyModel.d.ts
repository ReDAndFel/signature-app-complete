import { Model, Optional } from "sequelize";
export interface KeyAttributes {
    id?: number;
    alias: string;
    publicKey: string;
    userId: number;
}
export interface KeyCreationAttributes extends Optional<KeyAttributes, "id"> {
}
export interface KeyInstance extends Model<KeyAttributes, KeyCreationAttributes>, KeyAttributes {
}
export declare const SequelizeKeyModel: import("sequelize").ModelCtor<KeyInstance>;
