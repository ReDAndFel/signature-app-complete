import { File } from '../models/File';
export interface FileRepository {
    saveFile(file: File): Promise<File>;
    getFileById(id: number): Promise<File | null>;
    listFilesByUserId(userId: string): Promise<File[]>;
}
