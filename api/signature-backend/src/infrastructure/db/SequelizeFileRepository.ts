import dotenv from "dotenv";
dotenv.config();


import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";
import { SequelizeFileModel } from "./models/index";
import { KeyObject } from "crypto";

export class SequelizeFileRepository implements FileRepository {
    async saveFile(file: Express.Multer.File, userId: number): Promise<File> {

        const fileData: File = {
            fileName: file.originalname,
            hash: "",
            path: process.env.PATH_FILES + file.originalname,
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

    async updateFileHash(id: number, hash: KeyObject): Promise<void> {
        let hashText = hash.export({ format: 'pem', type: 'pkcs1'}) as string;
        await SequelizeFileModel.update({ hash: hashText }, { where: { id } });
    }
}