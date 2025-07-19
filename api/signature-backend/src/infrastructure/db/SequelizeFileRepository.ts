import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";
import { SequelizeFileModel } from "./models/SequelizeFileModel";

export class SequelizeFileRepository implements FileRepository {
    async saveFile(file: File): Promise<File> {
        const createdFile = await SequelizeFileModel.create({ ...file });
        return createdFile.toJSON() as File;
    }

    async getFileById(id: number): Promise<File | null> {
        const serchedFile = await SequelizeFileModel.findByPk(id);
        return serchedFile
    }

    async listFilesByUserId(userId: string): Promise<File[]> {
        const files = await SequelizeFileModel.findAll({
            where: { userId: parseInt(userId, 10) },
        });
        return files.map(file => file.toJSON() as File);
    }
}