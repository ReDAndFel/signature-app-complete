import { SharedFileRepository } from "../../domain/repositories/SharedFileRepository";
import { SequelizeSharedFileModel } from "./models/index";

export class SequelizeSharedFileRepository implements SharedFileRepository {
  async shareFile(
    fileId: number,
    ownerUserId: number,
    sharedWithUserId: number
  ): Promise<void> {
    await SequelizeSharedFileModel.create({
      fileId,
      ownerUserId,
      sharedWithUserId,
    });
  }

  async getFilesSharedWithUser(userId: number): Promise<number[]> {
    const sharedRecords = await SequelizeSharedFileModel.findAll({
      where: { sharedWithUserId: userId },
    });
    return sharedRecords.map((record) => record.fileId);
  }

  async revokeAccess(fileId: number, sharedWithUserId: number): Promise<void> {
    await SequelizeSharedFileModel.destroy({
      where: { fileId, sharedWithUserId },
    });
  }

  async isFileSharedWithUser(fileId: number, userId: number): Promise<boolean> {
    const count = await SequelizeSharedFileModel.count({
      where: { fileId, sharedWithUserId: userId },
    });
    return count > 0;
  }
}
