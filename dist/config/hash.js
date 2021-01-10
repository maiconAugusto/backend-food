"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const data = {
    hash: process.env.HASH,
    expiresIn: process.env.expiresIn
};
exports.default = data;
