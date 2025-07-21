import { FileSignatures } from "../../../domain/models/FileSignatures";
import { File } from "../../../domain/models/File"; 

export interface SignatureWithFile extends FileSignatures {
    file: File;
}