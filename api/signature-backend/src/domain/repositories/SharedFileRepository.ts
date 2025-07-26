export interface SharedFileRepository {
  shareFile(
    fileId: number,
    ownerUserId: number,
    sharedWithUserId: number
  ): Promise<void>;

  getFilesSharedWithUser(userId: number): Promise<number[]>;

  revokeAccess(fileId: number, sharedWithUserId: number): Promise<void>;

  isFileSharedWithUser(fileId: number, userId: number): Promise<boolean>;
}
