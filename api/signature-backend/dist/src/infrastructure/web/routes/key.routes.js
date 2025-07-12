"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("../../../container");
const router = (0, express_1.Router)();
router.post("", container_1.keyController.generate);
router.post("/query", container_1.keyController.getByAlias);
exports.default = router;
//# sourceMappingURL=key.routes.js.map