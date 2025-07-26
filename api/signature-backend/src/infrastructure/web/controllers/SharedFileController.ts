import { Request, Response } from "express";
import { ShareFile } from "../../../application/use-cases/ShareFile";
import { RevokeFileAccess } from "../../../application/use-cases/RevokeFileAccess";

export class SharedFileController {
  constructor(
    private readonly shareFile: ShareFile,
    private readonly revokeFileAccess: RevokeFileAccess
  ) {}

  share = async (req: Request, res: Response) => {
    try {
      const { fileId, sharedWithUserId } = req.body;
      const ownerUserId = req.userId;

      if (!fileId || !sharedWithUserId || !ownerUserId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await this.shareFile.execute(+fileId, +ownerUserId, +sharedWithUserId);
      return res.status(200).json({ message: "File shared successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  shareWithMultipleUsers = async (req: Request, res: Response) => {
    try {
      const { fileId, userIds } = req.body;
      const ownerUserId = req.userId;

      if (!fileId || !userIds || !Array.isArray(userIds) || userIds.length === 0 || !ownerUserId) {
        return res.status(400).json({ error: "Missing required fields or invalid userIds array" });
      }

      const results = [];
      
      for (const userId of userIds) {
        try {
          await this.shareFile.execute(+fileId, +ownerUserId, +userId);
          results.push({ userId: +userId, success: true });
        } catch (error: any) {
          results.push({ userId: +userId, success: false, error: error.message });
        }
      }

      const successCount = results.filter(r => r.success).length;
      const message = `Archivo compartido con ${successCount} de ${userIds.length} usuarios`;

      return res.status(200).json({ message, results });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  revoke = async (req: Request, res: Response) => {
    try {
      const { fileId, sharedWithUserId } = req.body;

      if (!fileId || !sharedWithUserId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await this.revokeFileAccess.execute(+fileId, +sharedWithUserId);
      return res.status(200).json({ message: "Access revoked successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
}
