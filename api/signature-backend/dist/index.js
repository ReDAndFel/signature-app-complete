"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const Server_1 = __importDefault(require("./src/interfaces/http/Server"));
const database_1 = require("./src/infrastructure/config/database");
const PORT = process.env.PORT || 3000;
const privateKey = fs_1.default.readFileSync(process.env.SSL_KEY_PATH || "./certs/server.key", "utf8");
const certificate = fs_1.default.readFileSync(process.env.SSL_CERT_PATH || "./certs/server.crt", "utf8");
console.log("Loading SSL certificates...");
const credentials = { key: privateKey, cert: certificate };
async function start() {
    try {
        await database_1.sequelize.sync();
        https_1.default.createServer(credentials, Server_1.default).listen(PORT, () => {
            console.log(`HTTPS server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
    }
}
start();
//# sourceMappingURL=index.js.map