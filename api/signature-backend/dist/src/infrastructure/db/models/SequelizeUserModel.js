"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
exports.SequelizeUserModel = database_1.sequelize.define("SequelizeUserModel", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    oauthProvider: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "oauthprovider",
    },
    oauthId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "oauthid",
    },
    avatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        field: "avatarurl",
    },
}, {
    tableName: "users",
    timestamps: false,
});
//# sourceMappingURL=SequelizeUserModel.js.map