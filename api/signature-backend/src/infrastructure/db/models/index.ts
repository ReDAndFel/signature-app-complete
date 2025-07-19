import { SequelizeUserModel } from "./SequelizeUserModel";
import { SequelizeKeyModel } from "./SequelizeKeyModel";

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

export {
  SequelizeUserModel,
  SequelizeKeyModel,
};
