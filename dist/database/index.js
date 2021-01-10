"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const index_1 = require("../database/index");
index_1.default;
const database = mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true, useUnifiedTopology: true
});
exports.default = database;
