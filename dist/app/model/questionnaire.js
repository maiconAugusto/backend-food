"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const questionnaire = new mongoose.Schema({
    user: { type: 'string', required: true },
    title: { type: 'string' },
    questionnaires: Array,
    latitude: { type: 'string' },
    longitude: { type: 'string' },
    date: { type: 'string' },
});
exports.default = mongoose.model('questionnaire', questionnaire);
