"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const util_1 = require("util");
const hash_1 = require("../config/hash");
class Middleware {
    Middleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ data: 'Acesso negado.' });
            }
            const [bearer, token] = authHeader.split(' ');
            try {
                yield util_1.promisify(jwt.verify)(token, hash_1.default.hash, { expiresIn: hash_1.default.expiresIn });
                return next();
            }
            catch (err) {
                return res.status(401).json({ error: 'token invalido' });
            }
        });
    }
}
exports.default = new Middleware;
