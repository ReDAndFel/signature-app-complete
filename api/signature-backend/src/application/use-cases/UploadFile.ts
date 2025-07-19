import { FileRepository } from "../../domain/repositories/FileRepository";
import { File } from "../../domain/models/File";

export class UploadFile {
  constructor(private fileRepo: FileRepository) {}

  async execute(file: File): Promise<File> {
    // Validate the file (e.g., check size, type)
    if (!this.isValidFile(file)) {
      throw new Error("Invalid file");
    }

    // Save the file using the repository
    const savedFile = await this.fileRepo.saveFile(file);
    
    return savedFile;
  }

  private isValidFile(file: File): boolean {
    
    if ( !file || !file.fileName || file.size <= 0 || !file.mimeType ) {
      return false; // Basic validation for file properties
    }

    return true; // Placeholder for actual validation logic
  }
}