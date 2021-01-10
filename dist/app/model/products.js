"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const products = new mongoose.Schema({
    product: { type: 'string', required: true },
    description: { type: 'string' },
    image_url: { type: 'string' },
    image_path: { type: 'string' },
    price: { type: 'string' },
    type: { type: 'string' },
    like: { type: Number },
    deslike: { type: Number },
    userId: { type: 'string' }
});
exports.default = mongoose.model('products', products);
