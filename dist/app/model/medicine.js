"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const medicines = new mongoose.Schema({
    product: { type: 'string', required: true },
    description: { type: 'string' },
    price: { type: 'string' },
    validity: { type: 'string', required: true },
    quantity: { type: 'string', required: true },
});
exports.default = mongoose.model('medicines', medicines);
