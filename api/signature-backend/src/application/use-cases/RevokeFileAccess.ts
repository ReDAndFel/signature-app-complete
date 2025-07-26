import { SharedFileRepository } from "../../domain/repositories/SharedFileRepository";

export class RevokeFileAccess {
  constructor(private readonly sharedFileRepo: SharedFileRepository) {}

  async execute(fileId: number, sharedWithUserId: number): Promise<void> {
    try {
      await this.sharedFileRepo.revokeAccess(fileId, sharedWithUserId);
    } catch (error: any) {
      throw new Error(`Error revoking access: ${error.message}`);
    }
  }
}
