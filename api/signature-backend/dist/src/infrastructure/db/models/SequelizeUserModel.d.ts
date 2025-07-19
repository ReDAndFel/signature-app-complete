import { Model, Optional } from "sequelize";
export interface UserAttributes {
    id?: number;
    name: string;
    email: string;
    oauthProvider: string;
    oauthId: string;
    avatarUrl: string;
}
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
}
export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
}
export declare const SequelizeUserModel: import("sequelize").ModelCtor<UserInstance>;
