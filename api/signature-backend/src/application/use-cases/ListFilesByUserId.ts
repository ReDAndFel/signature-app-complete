import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";

export class ListFilesByUserId {
    constructor(private readonly fileRepo: FileRepository) {}

    async execute(userId: number): Promise<File[]> {
        try {
            const files = await this.fileRepo.listFilesByUserId(userId);
            if (!files || files.length === 0) throw new Error("No files found for this user");
            return files;
        } catch (error: any) {
            throw new Error(`Error listing files by user ID: ${error.message}`);
        }
    }
}
