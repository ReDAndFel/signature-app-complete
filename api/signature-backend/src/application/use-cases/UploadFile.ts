import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";

export class UploadFile {
  constructor(private fileRepo: FileRepository) {}

  async execute(file: Express.Multer.File, userId: number): Promise<File> {
    // Validate the file (e.g., check size, type)
    if (!this.isValidFile(file)) {
      throw new Error("Invalid file");
    }

    // Save the file using the repository
    const savedFile = await this.fileRepo.saveFile(file, userId);

    return savedFile;
  }

  private isValidFile(file: Express.Multer.File): boolean {
    if (!file) {
      return false;
    }

    return true;
  }
}
