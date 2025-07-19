import { SequelizeKeyRepository } from "./infrastructure/db/SequelizeKeyRepository";

import { NodeCryptoService } from "./infrastructure/crypto/NodeCryptoService";
import { GenerateKeyPair } from "./application/use-cases/GenerateKeyPair";
import { KeyController } from "./infrastructure/web/controllers/KeyController";
import { GetPublicKeyByAlias } from "./application/use-cases/GetPublicKeyByAlias";
import { SequelizeUserRepository } from "./infrastructure/db/SequelizeUserRepository";
import { SaveUser } from "./application/use-cases/SaveUser";
import { GetUserByEmail } from "./application/use-cases/GetUserByEmail";
import { OAuthController } from "./infrastructure/web/controllers/OAuthController";
import { GetUserById } from "./application/use-cases/GetUserById";
import { UserController } from "./infrastructure/web/controllers/UserController";
import { JwtService } from "./infrastructure/security/JwtService";
import { AuthMiddleware } from "./infrastructure/security/AuthMiddleware";
import { SequelizeFileRepository } from "./infrastructure/db/SequelizeFileRepository";
import { UploadFile } from "./application/use-cases/UploadFile";
import { GetFileById } from "./application/use-cases/GetFileById";
import { FileController } from "./infrastructure/web/controllers/FileController";
import { SignFile } from "./application/use-cases/SignFile";
import { VerifyFileSignature } from "./application/use-cases/VerifyFileSignature";

// Repositories
const keyRepository = new SequelizeKeyRepository();
const userRepository = new SequelizeUserRepository();
const fileRepository = new SequelizeFileRepository(); 

//services
const cryptoService = new NodeCryptoService();
const jwtService = new JwtService();

// middleware
const authMiddleware = AuthMiddleware(jwtService);

// user-case
const generateKeyPair = new GenerateKeyPair(cryptoService, keyRepository);
const getPublicKeyByAlias = new GetPublicKeyByAlias(keyRepository);
const saveUser = new SaveUser(userRepository);
const getUserByEmail = new GetUserByEmail(userRepository);
const getUserById = new GetUserById(userRepository);
const uploadFile = new UploadFile(fileRepository);
const getFileById = new GetFileById(fileRepository);
const signFile = new SignFile(fileRepository);
const verifySignature = new VerifyFileSignature(fileRepository, userRepository);

// controllers
const keyController = new KeyController(generateKeyPair, getPublicKeyByAlias);
const oAuthController = new OAuthController(
  saveUser,
  jwtService
);
const userController = new UserController(getUserByEmail, getUserById);
const fileController = new FileController(uploadFile, getFileById, signFile, verifySignature);
export { keyController, oAuthController, userController, fileController, authMiddleware };
