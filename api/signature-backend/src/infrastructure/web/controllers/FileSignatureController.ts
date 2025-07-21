import { ListSignaturesByFileId } from "../../../application/use-cases/ListSignaturesFileById";
import { ListSignaturesByUserId } from "../../../application/use-cases/ListSignaturesByUserId";
import { VerifyFileSignature } from "../../../application/use-cases/VerifyFileSignature";
import { GetSignatureById } from "../../../application/use-cases/GetSignatureById";
import { SignFile } from "../../../application/use-cases/SignFile";
import { Request, Response } from "express";

export class FileSignatureController {
    constructor(
        private readonly signFile: SignFile,
        private readonly getSignatureById: GetSignatureById,
        private readonly listSignaturesByFileId: ListSignaturesByFileId,
        private readonly listSignatureByUserId: ListSignaturesByUserId,
        private readonly verifySignature: VerifyFileSignature
    ) { }

    sign = async (req: Request, res: any) => {
        try {
            if (!req.userId) return res.status(400).json({ error: "User ID is required" });
            const userId = +req.userId;
            const fileId = parseInt(req.params.id, 10);

            if (!req.file) return res.status(400).json({ error: "Private key file is required" })
            const privateKeyFile = req.file;


            const fileSigned = await this.signFile.execute(userId, fileId, privateKeyFile);
            res.status(200).json(fileSigned);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    getSignature = async (req: any, res: any) => {
        const id = parseInt(req.params.id, 10);
        try {
            const signature = await this.getSignatureById.execute(id);
            if (!signature) {
                return res.status(404).json({ error: "Signature not found" });
            }
            res.status(200).json(signature);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    listSignaturesByFile = async (req: any, res: any) => {
        const fileId = parseInt(req.params.id, 10);
        try {
            const signatures = await this.listSignaturesByFileId.execute(fileId);
            res.status(200).json(signatures);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    listSignaturesByUser = async (req: any, res: any) => {
        const userId = +req.user.id;
        try {
            const signatures = await this.listSignatureByUserId.execute(userId);
            res.status(200).json(signatures);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    verify = async (req: Request, res: Response) => {
        try {
            const signatureId = +req.params.id;
            if (!signatureId) throw new Error("signature ID is required");

            if (!req.userId) throw new Error("Usuario no identificado");
            const userId = +req.userId;

            const isValid = await this.verifySignature.execute(signatureId, userId);
            return res.status(200).json({ valid: isValid });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

}