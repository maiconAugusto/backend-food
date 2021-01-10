"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const crypto = require("crypto");
const path_1 = require("path");
exports.default = {
    storage: multer.diskStorage({
        destination: path_1.resolve(__dirname + '..', '..', '..', 'temp'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err)
                    return;
                return cb(null, res.toString('hex') + path_1.extname(file.originalname));
            });
        }
    })
};
