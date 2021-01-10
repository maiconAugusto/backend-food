"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("../config/firebase"));
const fs_1 = require("fs");
exports.default = {
    async uploadFile(req, res, next) {
        if (req.file === undefined) {
            return next();
        }
        const metadata = {
            metadata: {
                firebaseStorageDownloadTokens: req.file.filename
            },
            contentType: 'image/png',
            cacheControl: 'public, max-age=31536000',
        };
        await firebase_1.default.upload(req.file.path, {
            gzip: true,
            metadata: metadata,
        });
        let file = await Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + firebase_1.default.name + "/o/" + encodeURIComponent(req.file.filename) + "?alt=media&token=" + req.file.filename);
        req.body = {
            image_url: file,
            image_path: req.file.filename
        };
        fs_1.unlink(req.file.path, () => { });
        next();
    },
    async updateFile(req, res, next) {
        const { path_buket } = req.params;
        const metadata = {
            metadata: {
                firebaseStorageDownloadTokens: req.file.filename
            },
            contentType: 'image/png',
            cacheControl: 'public, max-age=31536000',
        };
        firebase_1.default.deleteFiles({
            prefix: path_buket
        }, async function (err) {
            if (!err) {
                await firebase_1.default.upload(req.file.path, {
                    gzip: true,
                    metadata: metadata,
                });
                let file = await Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + firebase_1.default.name + "/o/" + encodeURIComponent(req.file.filename) + "?alt=media&token=" + req.file.filename);
                req.body = {
                    image_url: file,
                    image_path: req.file.filename
                };
                fs_1.unlink(req.file.path, () => { });
                next();
            }
        });
    },
    async removeFile(req, res, next) {
        const { path_buket } = req.params;
        firebase_1.default.deleteFiles({
            prefix: path_buket
        }, function (err) {
            if (!err) {
                return next();
            }
            return res.status(400).json({ data: 'Not found!' });
        });
    }
};
//# sourceMappingURL=index.js.map