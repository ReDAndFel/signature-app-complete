"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeFileModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
const path_1 = __importDefault(require("path"));
exports.SequelizeFileModel = database_1.sequelize.define("SequelizeFileModel", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mimeType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        get() {
            const rawPath = this.getDataValue("path");
            return rawPath ? path_1.default.resolve(rawPath) : null;
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
            model: "users", // Assuming a 'users' table exists
            key: "id",
        }
    }
}, { tableName: "archivo", timestamps: false });
//# sourceMappingURL=SequelizeFileModel.js.map