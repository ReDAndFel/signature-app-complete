import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";
export declare class SequelizeFileRepository implements FileRepository {
    saveFile(file: File): Promise<File>;
    getFileById(id: number): Promise<File | null>;
    listFilesByUserId(userId: string): Promise<File[]>;
}
