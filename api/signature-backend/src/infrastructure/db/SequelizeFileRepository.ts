import dotenv from "dotenv";
dotenv.config();


import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";
import { SequelizeFileModel } from "./models/index";

export class SequelizeFileRepository implements FileRepository {
    async saveFile(file: Express.Multer.File, userId: number): Promise<File> {

        const fileData: File = {
            fileName: file.originalname,
            hash: "",
            path: process.env.PATH_FILES + file.filename,
            userId: userId
        }

        const createdFile = await SequelizeFileModel.create({ ...fileData });
        return createdFile.toJSON() as File;
    }

    async getFileById(id: number): Promise<File | null> {
        const serchedFile = await SequelizeFileModel.findByPk(id);
        return serchedFile
    }

    async listFilesByUserId(userId: number): Promise<File[]> {
        const files = await SequelizeFileModel.findAll({
            where: { userId: userId },
        });
        return files.map(file => file.toJSON() as File);
    }

    async updateFileHash(id: number, hash: string): Promise<void> {
        await SequelizeFileModel.update({ hash }, { where: { id } });
    }
}