"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DataBase {
    constructor() {
        this.db_url = process.env.MONGO;
    }
    createConnection() {
        mongoose.connect(this.db_url);
    }
}
exports.default = DataBase;
