import { SequelizeKeyRepository } from "./infrastructure/db/SequelizeKeyRepository";

import { NodeCryptoService } from "./infrastructure/crypto/NodeCryptoService";
import { GenerateKeyPair } from "./application/use-cases/GenerateKeyPair";
import { KeyController } from "./infrastructure/web/controllers/KeyController";
import { GetPublicKeyByAlias } from "./application/use-cases/GetPublicKeyByAlias";

// Servicios
const cryptoService = new NodeCryptoService();
const keyRepository = new SequelizeKeyRepository();

// Caso de uso
const generateKeyPair = new GenerateKeyPair(cryptoService, keyRepository);
const getPublicKeyByAlias = new GetPublicKeyByAlias(keyRepository);
// Controlador
const keyController = new KeyController(generateKeyPair, getPublicKeyByAlias);

export { keyController };
