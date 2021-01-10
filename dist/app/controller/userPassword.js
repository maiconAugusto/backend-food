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
class Users {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { password, newPassword } = req.body;
            const response = yield users_1.default.findOne({ '_id': id });
            if (!response) {
                return res.status(404).json({ data: 'Usuário não encontrado.' });
            }
            const passwordDB = response;
            const hash = yield bcrypt.compare(password, passwordDB.password);
            if (!hash) {
                return res.status(401).json({ data: 'Senha atual incorreta, tente novamente.' });
            }
            const newHash = yield bcrypt.hash(newPassword, bcrypt.genSaltSync(8));
            yield users_1.default.findOneAndUpdate({ _id: id }, { 'password': newHash });
            return res.status(200).json({ data: 'Atualizado com sucesso.' });
        });
    }
}
exports.default = new Users;
