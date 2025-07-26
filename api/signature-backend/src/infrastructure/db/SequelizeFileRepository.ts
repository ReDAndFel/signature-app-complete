import dotenv from "dotenv";
dotenv.config();

import { File } from "../../domain/models/File";
import { FileRepository } from "../../domain/repositories/FileRepository";

import { SequelizeFileModel, SequelizeSharedFileModel } from "./models/index";
import crypto from "crypto";
import fs from "fs";

export class SequelizeFileRepository implements FileRepository {
  async saveFile(file: Express.Multer.File, userId: number): Promise<File> {
    // Sacar hash SHA256 del archivo
    const filePath = process.env.PATH_FILES + file.originalname;
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    const fileData: File = {
      fileName: file.originalname,
      hash: hash,
      path: process.env.PATH_FILES + file.originalname,
      userId: userId,
    };

    const createdFile = await SequelizeFileModel.create({ ...fileData });
    return createdFile.toJSON() as File;
  }

  async getFileById(id: number): Promise<File | null> {
    const serchedFile = await SequelizeFileModel.findByPk(id);
    return serchedFile;
  }

  async listFilesByUserId(userId: number): Promise<File[]> {
    const files = await SequelizeFileModel.findAll({
      where: { userId: userId },
    });
    return files.map((file) => file.toJSON() as File);
  }

  async listAllFiles(): Promise<File[]> {
    const files = await SequelizeFileModel.findAll({
      order: [["id", "DESC"]], 
    });
    return files.map((file) => file.toJSON() as File);
  }

  async updateFileHash(id: number, hash: string): Promise<void> {
    await SequelizeFileModel.update({ hash }, { where: { id } });
  }

  async getAccessibleFiles(userId: number): Promise<File[]> {
    const ownFiles = await this.listFilesByUserId(userId);
    const sharedFileIds = await this.getFilesSharedWithUser(userId);

    const sharedFiles = await SequelizeFileModel.findAll({
      where: { id: sharedFileIds },
    });

    return [...ownFiles, ...sharedFiles.map((f) => f.toJSON() as File)];
  }

  async getFilesSharedWithUser(userId: number): Promise<number[]> {
    const shared = await SequelizeSharedFileModel.findAll({
      where: { sharedWithUserId: userId },
    });
    return shared.map((entry) => entry.fileId);
  }
}
