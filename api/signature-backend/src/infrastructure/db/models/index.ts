import { SequelizeUserModel } from "./SequelizeUserModel";
import { SequelizeKeyModel } from "./SequelizeKeyModel";
import { SequelizeFileModel } from "./SequelizeFileModel";

// Relación: Un usuario tiene muchas llaves
SequelizeUserModel.hasMany(SequelizeKeyModel, {
  foreignKey: "userId", // Campo en KeyModel que apunta al id del usuario
  sourceKey: "id",
  as: "keys", // nombre del alias para incluir más fácilmente
});

// Relación inversa: Una llave pertenece a un usuario
SequelizeKeyModel.belongsTo(SequelizeUserModel, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
});

// Relación: Un usuario tiene muchos archivos
SequelizeUserModel.hasMany(SequelizeFileModel, {
  foreignKey: "userId", // Campo en FileModel que apunta al id del usuario
  sourceKey: "id",
  as: "files", // nombre del alias para incluir más fácilmente
});

// Relación inversa: Un archivo pertenece a un usuario
SequelizeFileModel.belongsTo(SequelizeUserModel, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
});

export {
  SequelizeUserModel,
  SequelizeKeyModel,
  SequelizeFileModel
};
