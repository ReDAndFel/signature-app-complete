import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";

export class ListFilesByUserId {
    constructor(private readonly fileRepo: FileRepository) {}

    async execute(): Promise<File[]> {
        try {
            // Ahora lista TODOS los archivos para que cualquier usuario pueda verlos y firmarlos
            const files = await this.fileRepo.listAllFiles();
            if (!files || files.length === 0) throw new Error("No files found");
            return files;
        } catch (error: any) {
            throw new Error(`Error listing files: ${error.message}`);
        }
    }
}
