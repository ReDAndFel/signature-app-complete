"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyController = void 0;
class KeyController {
    generateKeyPair;
    getPublicKeyByAlias;
    getPublicKeyByUserId;
    constructor(generateKeyPair, getPublicKeyByAlias, getPublicKeyByUserId) {
        this.generateKeyPair = generateKeyPair;
        this.getPublicKeyByAlias = getPublicKeyByAlias;
        this.getPublicKeyByUserId = getPublicKeyByUserId;
    }
    generate = async (req, res) => {
        const { alias } = req.body;
        const userId = req.userId;
        if (!alias)
            return res.status(400).json({ message: "Alias is required" });
        if (!userId)
            return res.status(401).json({ message: "userId is required" });
        const { privateKey } = await this.generateKeyPair.execute(alias, +userId);
        res.setHeader("Content-disposition", `attachment; filename=${alias}_private_key.pem`);
        res.setHeader("Content-type", "application/x-pem-file");
        res.send(privateKey);
    };
    getByAlias = async (req, res) => {
        const { alias } = req.body;
        if (!alias)
            return res.status(400).json({ message: "Alias is required" });
        const keyPair = await this.getPublicKeyByAlias.execute(alias);
        res.send(keyPair);
    };
    getByUserId = async (req, res) => {
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ message: "userId is required" });
        const keyPair = await this.getPublicKeyByUserId.execute(+userId);
        res.send(keyPair);
    };
}
exports.KeyController = KeyController;
//# sourceMappingURL=KeyController.js.map