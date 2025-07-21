import { FileSignatures } from "../models/FileSignatures";
import { SignatureWithFile } from "../../infrastructure/db/interfaces/SignatureWithFile";

export interface FileSignatureRepository {
    signFile(userId: number, fileId: number, filePath: string, privateKeyFile: Express.Multer.File): Promise<FileSignatures>;
    getSignatureById(id: number): Promise<SignatureWithFile | null>;
    listSignaturesByFileId(fileId: number): Promise<FileSignatures[]>;
    listSignaturesByUserId(userId: number): Promise<FileSignatures[]>;
    verifySignature(signatureId: number, userId: number): Promise<boolean>;
}