"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeFileRepository = void 0;
const SequelizeFileModel_1 = require("./models/SequelizeFileModel");
class SequelizeFileRepository {
    async saveFile(file) {
        const createdFile = await SequelizeFileModel_1.SequelizeFileModel.create({ ...file });
        return createdFile.toJSON();
    }
    async getFileById(id) {
        const serchedFile = await SequelizeFileModel_1.SequelizeFileModel.findByPk(id);
        return serchedFile;
    }
    async listFilesByUserId(userId) {
        const files = await SequelizeFileModel_1.SequelizeFileModel.findAll({
            where: { userId: parseInt(userId, 10) },
        });
        return files.map(file => file.toJSON());
    }
}
exports.SequelizeFileRepository = SequelizeFileRepository;
//# sourceMappingURL=SequelizeFileRepository.js.map