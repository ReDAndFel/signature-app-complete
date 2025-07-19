"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeFileModel = exports.SequelizeKeyModel = exports.SequelizeUserModel = void 0;
const SequelizeUserModel_1 = require("./SequelizeUserModel");
Object.defineProperty(exports, "SequelizeUserModel", { enumerable: true, get: function () { return SequelizeUserModel_1.SequelizeUserModel; } });
const SequelizeKeyModel_1 = require("./SequelizeKeyModel");
Object.defineProperty(exports, "SequelizeKeyModel", { enumerable: true, get: function () { return SequelizeKeyModel_1.SequelizeKeyModel; } });
const SequelizeFileModel_1 = require("./SequelizeFileModel");
Object.defineProperty(exports, "SequelizeFileModel", { enumerable: true, get: function () { return SequelizeFileModel_1.SequelizeFileModel; } });
// Relación: Un usuario tiene muchas llaves
SequelizeUserModel_1.SequelizeUserModel.hasMany(SequelizeKeyModel_1.SequelizeKeyModel, {
    foreignKey: "userId", // Campo en KeyModel que apunta al id del usuario
    sourceKey: "id",
    as: "keys", // nombre del alias para incluir más fácilmente
});
// Relación inversa: Una llave pertenece a un usuario
SequelizeKeyModel_1.SequelizeKeyModel.belongsTo(SequelizeUserModel_1.SequelizeUserModel, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});
// Relación: Un usuario tiene muchos archivos
SequelizeUserModel_1.SequelizeUserModel.hasMany(SequelizeFileModel_1.SequelizeFileModel, {
    foreignKey: "userId", // Campo en FileModel que apunta al id del usuario
    sourceKey: "id",
    as: "files", // nombre del alias para incluir más fácilmente
});
// Relación inversa: Un archivo pertenece a un usuario
SequelizeFileModel_1.SequelizeFileModel.belongsTo(SequelizeUserModel_1.SequelizeUserModel, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});
//# sourceMappingURL=index.js.map