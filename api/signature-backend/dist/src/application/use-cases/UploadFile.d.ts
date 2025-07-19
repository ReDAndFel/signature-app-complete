import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";
export declare class UploadFile {
    private fileRepo;
    constructor(fileRepo: FileRepository);
    execute(file: Express.Multer.File, userId: number): Promise<File>;
    private isValidFile;
}
