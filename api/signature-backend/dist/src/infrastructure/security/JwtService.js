"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET || "dev-secret";
const defaultSignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "signature-app",
    audience: "signature-app-users",
};
class JwtService {
    generate(payload) {
        const jti = crypto.randomUUID();
        return jsonwebtoken_1.default.sign({ ...payload, jti }, SECRET, defaultSignOptions);
    }
    verify(token) {
        try {
            const options = {
                algorithms: ["HS256"],
                issuer: "signature-app",
                audience: "signature-app-users",
            };
            const decoded = jsonwebtoken_1.default.verify(token, SECRET, options);
            if (!decoded.sub)
                throw new Error("Missing subject (sub) in token");
            if (!decoded.jti)
                throw new Error("Missing JWT ID (jti)");
            if (!decoded.iat)
                throw new Error("Missing issued at (iat)");
            return decoded;
        }
        catch (err) {
            if (err.name === "TokenExpiredError") {
                throw new Error("Token has expired");
            }
            else if (err.name === "JsonWebTokenError") {
                throw new Error("Invalid token");
            }
            else if (err.name === "NotBeforeError") {
                throw new Error("Token not active yet");
            }
            else {
                throw new Error("Token verification failed");
            }
        }
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=JwtService.js.map