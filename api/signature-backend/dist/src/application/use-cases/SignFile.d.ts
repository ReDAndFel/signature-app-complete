import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";
export declare class SignFile {
    private readonly fileRepository;
    constructor(fileRepository: FileRepository);
    execute(fileId: number, hash: string): Promise<File>;
}
