"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const solicitation = new mongoose.Schema({
    solicitation: { type: Object, required: true }
});
exports.default = mongoose.model('solicitation', solicitation);
