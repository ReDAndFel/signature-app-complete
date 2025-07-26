import { File } from '../models/File';

export interface FileRepository {
    saveFile(file: Express.Multer.File, userId: number): Promise<File>;
    getFileById(id: number): Promise<File | null>;
    listFilesByUserId(userId: number): Promise<File[]>;
    listAllFiles(): Promise<File[]>; 
    updateFileHash(id: number, hash: string): Promise<void>;
    getAccessibleFiles(userId: number): Promise<File[]>; 
}