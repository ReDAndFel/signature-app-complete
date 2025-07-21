import { SequelizeFileModel, SequelizeFileSignatureModel, SequelizeKeyModel} from "./models";
import { FileSignatures } from "../../domain/models/FileSignatures";
import { FileSignatureRepository } from "../../domain/repositories/FileSignatureRepository";
import { SignatureWithFile } from "./interfaces/SignatureWithFile";
import crypto from 'crypto';
import fs from 'fs';


export class SequelizeFileSignatureRepository implements FileSignatureRepository {
    async signFile(userId: number, fileId: number, filePath: string, privateKeyFile: Express.Multer.File): Promise<FileSignatures> {
        
        // Leer el archivo a firmar
        const fileBuffer = fs.readFileSync(filePath);
        
        // Leer el contenido de la llave privada desde el archivo subido
        let privateKeyPem: string;
        
        if (privateKeyFile.buffer) {
            privateKeyPem = privateKeyFile.buffer.toString('utf-8');
        } else if (privateKeyFile.path) {
            privateKeyPem = fs.readFileSync(privateKeyFile.path, 'utf-8');
        } else {
            throw new Error("No se pudo obtener el contenido de la llave privada");
        }

        const fileAlias = await SequelizeKeyModel.findOne({ where: {userId, alias: privateKeyFile.originalname} });

        if(!fileAlias) throw new Error("No existe una llave con este alias")
        const keyId = fileAlias.toJSON().id

        if(!keyId) throw new Error("No hay llave asignada a este usuario")

        // Firmar el archivo
        const signature = crypto.createSign('SHA256');
        signature.update(fileBuffer);
        signature.end();
        const sign = signature.sign(privateKeyPem, 'base64');

        const fileSignature: FileSignatures = {
            userId: userId,
            fileId: fileId,
            keyId: keyId,
            signature: sign,
        }

        const signedFile = await SequelizeFileSignatureModel.create({ ...fileSignature }); 
        return signedFile.toJSON() as FileSignatures;
    }

    async getSignatureById(id: number): Promise<SignatureWithFile | null> {
        // Buscar la firma por ID
        const signature = await SequelizeFileSignatureModel.findByPk(id, {
            include: [{ model: SequelizeFileModel, as: 'file' }]
        });
        return signature ? (signature.toJSON() as SignatureWithFile) : null;
    }

    async listSignaturesByFileId(fileId: number): Promise<FileSignatures[]> {
        // Listar firmas por ID de archivo
        const signatures = await SequelizeFileSignatureModel.findAll({
            where: { fileId: fileId },
        });
        return signatures.map(signature => signature.toJSON() as FileSignatures);
    }

    async listSignaturesByUserId(userId: number): Promise<FileSignatures[]> {
        // Listar firmas por ID de usuario
        const signatures = await SequelizeFileSignatureModel.findAll({
            where: { userId: userId },
        });
        return signatures.map(signature => signature.toJSON() as FileSignatures);
    }

    async verifySignature(fileId: number, userId: number): Promise<boolean> {
        // Obtener la firma del archivo
        const fileSignature = await this.getSignatureById(fileId);
        if (!fileSignature || !fileSignature.signature || !fileSignature.file) {
            throw new Error("Firma no encontrada o archivo no firmado");
        }

        const fileBuffer = fs.readFileSync(fileSignature.file.path);

        const key = await SequelizeKeyModel.findOne({ where: {userId, alias: fileSignature.keyId} });
        const publicKeyPem = key?.toJSON().publicKey;

        if(!publicKeyPem) throw new Error("No se encontró una llave asociada")

        // Verificar la firma
        const verify = crypto.createVerify('SHA256');
        verify.update(fileBuffer);
        verify.end();
        
        return verify.verify(publicKeyPem, fileSignature.signature, 'base64');
    }
}