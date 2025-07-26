import { SharedFileRepository } from "../../domain/repositories/SharedFileRepository";

export class ShareFile {
  constructor(private readonly sharedFileRepo: SharedFileRepository) {}

  async execute(
    fileId: number,
    ownerUserId: number,
    sharedWithUserId: number
  ): Promise<void> {
    try {
      if (ownerUserId === sharedWithUserId) {
        throw new Error("Cannot share file with yourself");
      }

      await this.sharedFileRepo.shareFile(
        fileId,
        ownerUserId,
        sharedWithUserId
      );
    } catch (error: any) {
      throw new Error(`Error sharing file: ${error.message}`);
    }
  }
}
