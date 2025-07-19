"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyController = void 0;
class KeyController {
    generateKeyPair;
    getPublicKeyByAlias;
    constructor(generateKeyPair, getPublicKeyByAlias) {
        this.generateKeyPair = generateKeyPair;
        this.getPublicKeyByAlias = getPublicKeyByAlias;
    }
    generate = async (req, res) => {
        const { alias } = req.body;
        if (!alias)
            return res.status(400).json({ message: "Alias is required" });
        const { privateKey } = await this.generateKeyPair.execute(alias);
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
}
exports.KeyController = KeyController;
//# sourceMappingURL=KeyController.js.map