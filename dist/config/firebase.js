"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const dotenv = require("dotenv");
dotenv.config();
const data = serviceAccount;
admin.initializeApp({
    credential: admin.credential.cert(data),
    storageBucket: process.env.KEY
});
let bucket = admin.storage().bucket();
exports.default = bucket;
