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
import { GetPublicKeyByUser } from "./application/use-cases/GetPublicKeyByUser";
import { SequelizeFileSignatureRepository } from "./infrastructure/db/SequelizeFileSignatureRepository";
import { FileSignatureController } from "./infrastructure/web/controllers/FileSignatureController";
import { GetSignatureById } from "./application/use-cases/GetSignatureById";
import { ListSignaturesByFileId } from "./application/use-cases/ListSignaturesFileById";
import { ListSignaturesByUserId } from "./application/use-cases/ListSignaturesByUserId";
import { ListAccessibleFiles } from "./application/use-cases/ListAccessibleFiles";
import { ShareFile } from "./application/use-cases/ShareFile";
import { RevokeFileAccess } from "./application/use-cases/RevokeFileAccess";
import { SequelizeSharedFileRepository } from "./infrastructure/db/SequelizeSharedFileRepository";
import { SharedFileController } from "./infrastructure/web/controllers/SharedFileController";

// Repositories
const keyRepository = new SequelizeKeyRepository();
const userRepository = new SequelizeUserRepository();
const fileRepository = new SequelizeFileRepository();
const fileSignatureRepository = new SequelizeFileSignatureRepository();
const sharedFileRepository = new SequelizeSharedFileRepository();

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
const listAccessibleFiles = new ListAccessibleFiles(fileRepository);

const signFile = new SignFile(fileSignatureRepository, fileRepository);
const getSignatureById = new GetSignatureById(fileSignatureRepository);
const listSignaturesByFileId = new ListSignaturesByFileId(
  fileSignatureRepository
);
const listSignatureByUserId = new ListSignaturesByUserId(
  fileSignatureRepository
);
const verifySignature = new VerifyFileSignature(fileSignatureRepository);
const getPublicKeyByUserId = new GetPublicKeyByUser(keyRepository);

const shareFile = new ShareFile(sharedFileRepository);
const revokeFileAccess = new RevokeFileAccess(sharedFileRepository);
// controllers
const keyController = new KeyController(
  generateKeyPair,
  getPublicKeyByAlias,
  getPublicKeyByUserId
);
const oAuthController = new OAuthController(saveUser, jwtService);
const userController = new UserController(getUserByEmail, getUserById);
const fileController = new FileController(
  uploadFile,
  getFileById,
  listAccessibleFiles
);
const signFileController = new FileSignatureController(
  signFile,
  getSignatureById,
  listSignaturesByFileId,
  listSignatureByUserId,
  verifySignature
);

const sharedFileController = new SharedFileController(
  shareFile,
  revokeFileAccess
);
export {
  keyController,
  oAuthController,
  userController,
  fileController,
  signFileController,
  sharedFileController,
  authMiddleware,
};
