import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";
export declare class SequelizeFileRepository implements FileRepository {
    saveFile(file: Express.Multer.File, userId: number): Promise<File>;
    getFileById(id: number): Promise<File | null>;
    listFilesByUserId(userId: number): Promise<File[]>;
    updateFileHash(id: number, hash: string): Promise<void>;
}
