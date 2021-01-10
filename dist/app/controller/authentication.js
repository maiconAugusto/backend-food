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
const users_1 = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hash_1 = require("../../config/hash");
class Authentication {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const response = yield users_1.default.findOne({ 'email': email });
            if (!response) {
                return res.status(401).json({ data: 'E-mail não encontrado.' });
            }
            const userData = response;
            const hash = yield bcrypt.compare(password, userData.password);
            if (!hash) {
                return res.status(401).json({ data: 'Senha incorreta.' });
            }
            const data = {
                id: userData._id,
                email: userData.email,
                name: userData.name,
                lastName: userData.lastName,
                image_url: userData.image_url,
                image_path: userData.image_path,
                storeName: userData.storeName,
                token: jwt.sign({ id: userData.id }, hash_1.default.hash, {
                    expiresIn: hash_1.default.expiresIn,
                })
            };
            return res.status(200).json({ data });
        });
    }
}
exports.default = new Authentication;
