"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../../container");
const router = (0, express_1.Router)();
router.get("/email/:email", container_1.authMiddleware, container_1.userController.getUserByEmail);
router.get("/id/:id", container_1.authMiddleware, container_1.userController.getUserById);
exports.default = router;
//# sourceMappingURL=user.routes.js.map