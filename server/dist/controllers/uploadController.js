"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = UploadFile;
exports.DeleteFile = DeleteFile;
const multerUpload_1 = __importDefault(require("../utils/multerUpload"));
const fs_1 = __importDefault(require("fs"));
const path = require("path");
async function UploadFile(req, res) {
    (0, multerUpload_1.default)(req, res, (err) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        else {
            const documentFile = req.file;
            if (documentFile == undefined) {
                res.status(400).json({ message: "No file selected!" });
            }
            else {
                res.status(200).json({
                    message: "File uploaded!",
                    filePath: `/uploads/${documentFile.filename}`,
                });
            }
        }
    });
}
async function DeleteFile(req, res) {
    const { filename } = req.body;
    if (!filename) {
        return res.status(400).json({ message: "Filename is required" });
    }
    const filePath = path.join(__dirname, `../../uploads/${filename}`);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            if (err.code === "ENOENT") {
                return res.status(404).json({ message: "File not found" });
            }
            return res
                .status(500)
                .json({ message: "Error deleting file", error: err.message });
        }
        return res.json({
            message: "File deleted successfully",
            status: 200,
            data: filename,
        });
    });
}
