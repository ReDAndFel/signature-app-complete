import { FileRepository } from "../../domain/repositories/FileRepository";
import { KeyRepository } from "../../domain/repositories/KeyRepository";
export declare class VerifyFileSignature {
    private readonly fileRepository;
    private readonly keyRepository;
    constructor(fileRepository: FileRepository, keyRepository: KeyRepository);
    execute(fileId: number): Promise<boolean>;
}
