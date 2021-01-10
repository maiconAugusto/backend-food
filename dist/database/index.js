"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const database = mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true, useUnifiedTopology: true
});
exports.default = database;
