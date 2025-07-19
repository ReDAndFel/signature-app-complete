import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";
export declare class UploadFile {
    private fileRepo;
    constructor(fileRepo: FileRepository);
    execute(file: File): Promise<File>;
    private isValidFile;
}
