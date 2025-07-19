"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
function AuthMiddleware(jwtService) {
    return function authMiddleware(req, res, next) {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        try {
            const payload = jwtService.verify(token);
            req.userId = payload.sub;
            next();
        }
        catch {
            res.status(401).json({ message: "Invalid token" });
        }
    };
}
//# sourceMappingURL=AuthMiddleware.js.map