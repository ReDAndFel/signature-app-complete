import { Request, Response } from "express";
import { GenerateKeyPair } from "../../../application/use-cases/GenerateKeyPair";
import { GetPublicKeyByAlias } from "../../../application/use-cases/GetPublicKeyByAlias";

export class KeyController {
  constructor(
    private readonly generateKeyPair: GenerateKeyPair,
    private readonly getPublicKeyByAlias: GetPublicKeyByAlias
  ) {}

  generate = async (req: Request, res: Response) => {
    const { alias } = req.body;
    const userId = req.userId; 

    if (!alias) return res.status(400).json({ message: "Alias is required" });
    if (!userId) return res.status(401).json({ message: "userId is required" });

    const { privateKey } = await this.generateKeyPair.execute(alias, +userId); 

    res.setHeader(
      "Content-disposition",
      `attachment; filename=${alias}_private_key.pem`
    );
    res.setHeader("Content-type", "application/x-pem-file");
    res.send(privateKey);
  };

  getByAlias = async (req: Request, res: Response) => {
    const { alias } = req.body;
    if (!alias) return res.status(400).json({ message: "Alias is required" });

    const keyPair = await this.getPublicKeyByAlias.execute(alias);

    res.send(keyPair);
  };
}
