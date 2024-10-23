"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = require("../controllers/uploadController");
const router = (0, express_1.Router)();
router.post("/upload", uploadController_1.UploadFile);
router.delete("/upload/delete", uploadController_1.DeleteFile);
exports.default = router;