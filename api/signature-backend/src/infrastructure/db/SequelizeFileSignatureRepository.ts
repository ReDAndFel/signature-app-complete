import {
  SequelizeFileModel,
  SequelizeFileSignatureModel,
  SequelizeKeyModel,
  SequelizeUserModel,
} from "./models";
import { FileSignatures } from "../../domain/models/FileSignatures";
import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";
import { SignatureWithFile } from "./interfaces/SignatureWithFile";
import crypto from "crypto";
import fs from "fs";

export class SequelizeFileSignatureRepository
  implements FileSignatureRepository
{
  async signFile(
    userId: number,
    fileId: number,
    filePath: string,
    privateKeyFile: Express.Multer.File
  ): Promise<FileSignatures> {
    // Leer el archivo a firmar
    const fileBuffer = fs.readFileSync(filePath);

    // Leer el contenido de la llave privada desde el archivo subido
    let privateKeyPem: string;

    if (privateKeyFile.buffer) {
      privateKeyPem = privateKeyFile.buffer.toString("utf-8");
    } else if (privateKeyFile.path) {
      privateKeyPem = fs.readFileSync(privateKeyFile.path, "utf-8");
    } else {
      throw new Error("No se pudo obtener el contenido de la llave privada");
    }

    const originalName = privateKeyFile.originalname;
    const alias = originalName.endsWith(".pem")
      ? originalName.slice(0, -4)
      : originalName;

    const fileAlias = await SequelizeKeyModel.findOne({
      where: { userId, alias },
    });

    if (!fileAlias) throw new Error("No existe una llave con este alias");
    const keyId = fileAlias.toJSON().id;

    if (!keyId) throw new Error("No hay llave asignada a este usuario");

    // Firmar el archivo
    const signature = crypto.createSign("SHA256");
    signature.update(fileBuffer);
    signature.end();
    const sign = signature.sign(privateKeyPem, "base64");

    const fileSignature: FileSignatures = {
      userId: userId,
      fileId: fileId,
      keyId: keyId,
      signature: sign,
    };

    const signedFile = await SequelizeFileSignatureModel.create({
      ...fileSignature,
    });
    return signedFile.toJSON() as FileSignatures;
  }

  async getSignatureById(id: number): Promise<SignatureWithFile | null> {
    // Buscar la firma por ID
    const signature = await SequelizeFileSignatureModel.findByPk(id, {
      include: [{ model: SequelizeFileModel, as: "file" }],
    });
    return signature ? (signature.toJSON() as SignatureWithFile) : null;
  }

  async listSignaturesByFileId(fileId: number): Promise<FileSignatures[]> {
    // Listar firmas por ID de archivo incluyendo información del usuario
    const signatures = await SequelizeFileSignatureModel.findAll({
      where: { fileId: fileId },
      include: [
        {
          model: SequelizeUserModel,
          as: "user",
          attributes: ["id", "name", "email"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });
    
    return signatures.map((signature: any) => {
      const signatureData = signature.toJSON();
      return new FileSignatures(
        signatureData.signature,
        signatureData.keyId,
        signatureData.userId,
        signatureData.fileId,
        signatureData.createdAt,
        signatureData.user ? {
          id: signatureData.user.id,
          name: signatureData.user.name,
          email: signatureData.user.email
        } : undefined
      );
    });
  }

  async listSignaturesByUserId(userId: number): Promise<FileSignatures[]> {
    // Listar firmas por ID de usuario
    const signatures = await SequelizeFileSignatureModel.findAll({
      where: { userId: userId },
    });
    return signatures.map((signature) => signature.toJSON() as FileSignatures);
  }

  async verifySignature(signatureId: number, userId: number): Promise<boolean> {
    const fileSignature = await this.getSignatureById(signatureId);
    if (!fileSignature || !fileSignature.signature || !fileSignature.file) {
      throw new Error("Firma no encontrada o archivo no firmado");
    }

    const fileBuffer = fs.readFileSync(fileSignature.file.path);

    const key = await SequelizeKeyModel.findOne({
      where: { userId, id: fileSignature.keyId },
    });

    const publicKeyPem = key?.toJSON().publicKey;

    if (!publicKeyPem) throw new Error("No se encontró una llave asociada");

    const verify = crypto.createVerify("SHA256");
    verify.update(fileBuffer);
    verify.end();

    return verify.verify(publicKeyPem, fileSignature.signature, "base64");
  }
}
