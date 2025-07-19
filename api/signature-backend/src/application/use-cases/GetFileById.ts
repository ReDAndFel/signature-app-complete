import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";

export class GetFileById {
    constructor(private readonly fileRepo: FileRepository) {}
    
    async execute(fileId: number): Promise<File | null> {
        if (!fileId) {
        throw new Error('File ID must be provided');
        }
    
        const file = await this.fileRepo.getFileById(fileId);
        if (!file) {
        throw new Error(`File with ID ${fileId} not found`);
        }
    
        return file;
    }
}