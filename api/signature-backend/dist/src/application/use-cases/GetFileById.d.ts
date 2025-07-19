import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";
export declare class GetFileById {
    private readonly fileRepo;
    constructor(fileRepo: FileRepository);
    execute(fileId: number): Promise<File | null>;
}
