"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const key_routes_1 = __importDefault(require("../../infrastructure/web/routes/key.routes"));
const auth_routes_1 = __importDefault(require("../../infrastructure/web/routes/auth.routes"));
const user_routes_1 = __importDefault(require("../../infrastructure/web/routes/user.routes"));
const file_routes_1 = __importDefault(require("../../infrastructure/web/routes/file.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: `${process.env.URL_REDIRECT_FRONT}`,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use("/api/key", key_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/file", file_routes_1.default);
exports.default = app;
//# sourceMappingURL=Server.js.map