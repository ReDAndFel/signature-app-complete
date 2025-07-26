import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";

export class ListAccessibleFiles {
  constructor(private readonly fileRepo: FileRepository) {}

  async execute(userId: number): Promise<File[]> {
    try {
      const files = await this.fileRepo.getAccessibleFiles(userId);
      if (!files || files.length === 0)
        throw new Error("No accessible files found");
      return files;
    } catch (error: any) {
      throw new Error(`Error listing accessible files: ${error.message}`);
    }
  }
}
