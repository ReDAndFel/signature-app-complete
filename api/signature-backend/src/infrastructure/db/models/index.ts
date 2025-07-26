import { SequelizeUserModel } from "./SequelizeUserModel";
import { SequelizeKeyModel } from "./SequelizeKeyModel";
import { SequelizeFileModel } from "./SequelizeFileModel";
import { SequelizeFileSignatureModel } from "./SequelizeFileSignatureModel";
import { SequelizeSharedFileModel } from "./SequelizeSharedFile";

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

// Relación: Un archivo puede tener muchas firmas
SequelizeFileModel.hasMany(SequelizeFileSignatureModel, {
  foreignKey: "fileId", // Campo en FileSignatureModel que apunta al id del archivo
  sourceKey: "id",
  as: "fileSignatures", // nombre del alias para incluir más fácilmente
});

// Relación inversa: Una firma pertenece a un archivo
SequelizeFileSignatureModel.belongsTo(SequelizeFileModel, {
  foreignKey: "fileId",
  targetKey: "id",
  as: "file",
});

// Relación: Un usuario puede tener muchas firmas
SequelizeUserModel.hasMany(SequelizeFileSignatureModel, {
  foreignKey: "userId", // Campo en FileSignatureModel que apunta al id del usuario
  sourceKey: "id",
  as: "fileSignatures", // nombre del alias para incluir más fácilmente
});

// Relación inversa: Una firma pertenece a un usuario
SequelizeFileSignatureModel.belongsTo(SequelizeUserModel, {
  foreignKey: "userId",
  targetKey: "id",
  as: "user",
});

// Relación: Una llave puede tener varias firmas
SequelizeKeyModel.hasMany(SequelizeFileSignatureModel, {
  foreignKey: "keyId",
  sourceKey: "id",
  as: "fileSignatures"
});

// Relación inversa: Una firma solo puede tener una llave
SequelizeFileSignatureModel.belongsTo(SequelizeKeyModel, {
  foreignKey: "keyId",
  targetKey: "id",
  as: "keys"
});

export {
  SequelizeUserModel,
  SequelizeKeyModel,
  SequelizeFileModel,
  SequelizeFileSignatureModel,
  SequelizeSharedFileModel,
};
