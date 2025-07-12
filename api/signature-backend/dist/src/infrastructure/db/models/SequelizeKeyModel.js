"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeKeyModel = void 0;
// SequelizeKeyModel.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../../config/database");
exports.SequelizeKeyModel = database_1.sequelize.define("SequelizeKeyModel", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    alias: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publicKey: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        field: "public_key",
    },
}, {
    tableName: "llave",
    timestamps: false,
});
//# sourceMappingURL=SequelizeKeyModel.js.map