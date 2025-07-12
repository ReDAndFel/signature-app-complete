"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyController = void 0;
const SequelizeKeyRepository_1 = require("./infrastructure/db/SequelizeKeyRepository");
const NodeCryptoService_1 = require("./infrastructure/crypto/NodeCryptoService");
const GenerateKeyPair_1 = require("./application/use-cases/GenerateKeyPair");
const KeyController_1 = require("./infrastructure/web/controllers/KeyController");
const GetPublicKeyByAlias_1 = require("./application/use-cases/GetPublicKeyByAlias");
// Servicios
const cryptoService = new NodeCryptoService_1.NodeCryptoService();
const keyRepository = new SequelizeKeyRepository_1.SequelizeKeyRepository();
// Caso de uso
const generateKeyPair = new GenerateKeyPair_1.GenerateKeyPair(cryptoService, keyRepository);
const getPublicKeyByAlias = new GetPublicKeyByAlias_1.GetPublicKeyByAlias(keyRepository);
// Controlador
const keyController = new KeyController_1.KeyController(generateKeyPair, getPublicKeyByAlias);
exports.keyController = keyController;
//# sourceMappingURL=container.js.map