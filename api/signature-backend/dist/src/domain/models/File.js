"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    fileName;
    hash;
    path;
    id;
    userId;
    constructor(fileName, hash, path, id, userId) {
        this.fileName = fileName;
        this.hash = hash;
        this.path = path;
        this.id = id;
        this.userId = userId;
    }
}
exports.File = File;
//# sourceMappingURL=File.js.map