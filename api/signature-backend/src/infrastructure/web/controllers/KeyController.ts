import { Request, Response } from "express";
import { GenerateKeyPair } from "../../../application/use-cases/GenerateKeyPair";

export class KeyController {
  constructor(private readonly generateKeyPair: GenerateKeyPair) {}

  generate = async (req: Request, res: Response) => {
    const { alias } = req.body;
    if (!alias) return res.status(400).json({ message: "Alias is required" });

    const { privateKey } = await this.generateKeyPair.execute(alias);

    res.setHeader(
      "Content-disposition",
      `attachment; filename=${alias}_private_key.pem`
    );
    res.setHeader("Content-type", "application/x-pem-file");
    res.send(privateKey);
  };
}
