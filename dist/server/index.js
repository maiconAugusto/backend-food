"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../routes/index");
const cors = require("cors");
const index_2 = require("../database/index");
const dotenv = require("dotenv");
index_2.default;
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
dotenv.config();
let connectUser = {};
io.on('connection', (socket) => {
    socket.on('userOn', (data) => {
        connectUser = data;
    });
});
app.use((req, res, next) => {
    req.io = io;
    req.connectUser = connectUser;
    return next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index_1.default);
exports.default = server;
