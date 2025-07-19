"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.fileController = exports.userController = exports.oAuthController = exports.keyController = void 0;
const SequelizeKeyRepository_1 = require("./infrastructure/db/SequelizeKeyRepository");
const NodeCryptoService_1 = require("./infrastructure/crypto/NodeCryptoService");
const GenerateKeyPair_1 = require("./application/use-cases/GenerateKeyPair");
const KeyController_1 = require("./infrastructure/web/controllers/KeyController");
const GetPublicKeyByAlias_1 = require("./application/use-cases/GetPublicKeyByAlias");
const SequelizeUserRepository_1 = require("./infrastructure/db/SequelizeUserRepository");
const SaveUser_1 = require("./application/use-cases/SaveUser");
const GetUserByEmail_1 = require("./application/use-cases/GetUserByEmail");
const OAuthController_1 = require("./infrastructure/web/controllers/OAuthController");
const GetUserById_1 = require("./application/use-cases/GetUserById");
const UserController_1 = require("./infrastructure/web/controllers/UserController");
const JwtService_1 = require("./infrastructure/security/JwtService");
const AuthMiddleware_1 = require("./infrastructure/security/AuthMiddleware");
const SequelizeFileRepository_1 = require("./infrastructure/db/SequelizeFileRepository");
const UploadFile_1 = require("./application/use-cases/UploadFile");
const GetFileById_1 = require("./application/use-cases/GetFileById");
const FileController_1 = require("./infrastructure/web/controllers/FileController");
// Repositories
const keyRepository = new SequelizeKeyRepository_1.SequelizeKeyRepository();
const userRepository = new SequelizeUserRepository_1.SequelizeUserRepository();
const fileRepository = new SequelizeFileRepository_1.SequelizeFileRepository();
//services
const cryptoService = new NodeCryptoService_1.NodeCryptoService();
const jwtService = new JwtService_1.JwtService();
// middleware
const authMiddleware = (0, AuthMiddleware_1.AuthMiddleware)(jwtService);
exports.authMiddleware = authMiddleware;
// user-case
const generateKeyPair = new GenerateKeyPair_1.GenerateKeyPair(cryptoService, keyRepository);
const getPublicKeyByAlias = new GetPublicKeyByAlias_1.GetPublicKeyByAlias(keyRepository);
const saveUser = new SaveUser_1.SaveUser(userRepository);
const getUserByEmail = new GetUserByEmail_1.GetUserByEmail(userRepository);
const getUserById = new GetUserById_1.GetUserById(userRepository);
const uploadFile = new UploadFile_1.UploadFile(fileRepository);
const getFileById = new GetFileById_1.GetFileById(fileRepository);
// controllers
const keyController = new KeyController_1.KeyController(generateKeyPair, getPublicKeyByAlias);
exports.keyController = keyController;
const oAuthController = new OAuthController_1.OAuthController(saveUser, jwtService);
exports.oAuthController = oAuthController;
const userController = new UserController_1.UserController(getUserByEmail, getUserById);
exports.userController = userController;
const fileController = new FileController_1.FileController(uploadFile, getFileById);
exports.fileController = fileController;
//# sourceMappingURL=container.js.map