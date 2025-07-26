import { FileRepository } from "../../domain/repositories/FileRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";

interface FileWithUser {
  id?: number;
  fileName: string;
  hash: string;
  path: string;
  userId: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export class ListAccessibleFiles {
  constructor(
    private readonly fileRepo: FileRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(userId: number): Promise<FileWithUser[]> {
    try {
      const files = await this.fileRepo.getAccessibleFiles(userId);
      if (!files || files.length === 0)
        throw new Error("No accessible files found");

      // Enriquecer los archivos con información del usuario
      const filesWithUser: FileWithUser[] = [];
      
      for (const file of files) {
        try {
          const user = await this.userRepo.getUserById(file.userId);
          filesWithUser.push({
            id: file.id,
            fileName: file.fileName,
            hash: file.hash,
            path: file.path,
            userId: file.userId,
            user: user ? {
              id: user.id!,
              name: user.name,
              email: user.email
            } : undefined
          });
        } catch (error) {
          // Si no se puede obtener el usuario, agregar el archivo sin info de usuario
          filesWithUser.push({
            id: file.id,
            fileName: file.fileName,
            hash: file.hash,
            path: file.path,
            userId: file.userId
          });
        }
      }

      return filesWithUser;
    } catch (error: any) {
      throw new Error(`Error listing accessible files: ${error.message}`);
    }
  }
}
