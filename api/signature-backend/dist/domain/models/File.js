"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    fileName;
    mimeType;
    size;
    path;
    id;
    userId;
    constructor(fileName, mimeType, size, path, id, userId) {
        this.fileName = fileName;
        this.mimeType = mimeType;
        this.size = size;
        this.path = path;
        this.id = id;
        this.userId = userId;
    }
}
exports.File = File;
//# sourceMappingURL=File.js.map