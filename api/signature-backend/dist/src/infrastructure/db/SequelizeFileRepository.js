"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeFileRepository = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("./models/index");
class SequelizeFileRepository {
    async saveFile(file, userId) {
        const fileData = {
            fileName: file.originalname,
            hash: "",
            path: process.env.PATH_FILES + file.filename,
            userId: userId
        };
        const createdFile = await index_1.SequelizeFileModel.create({ ...fileData });
        return createdFile.toJSON();
    }
    async getFileById(id) {
        const serchedFile = await index_1.SequelizeFileModel.findByPk(id);
        return serchedFile;
    }
    async listFilesByUserId(userId) {
        const files = await index_1.SequelizeFileModel.findAll({
            where: { userId: userId },
        });
        return files.map(file => file.toJSON());
    }
    async updateFileHash(id, hash) {
        await index_1.SequelizeFileModel.update({ hash }, { where: { id } });
    }
}
exports.SequelizeFileRepository = SequelizeFileRepository;
//# sourceMappingURL=SequelizeFileRepository.js.map