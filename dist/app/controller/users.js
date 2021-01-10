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
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield users_1.default.find();
            return res.status(200).json({ data: response });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(yield users_1.default.findOne({ '_id': id }))) {
                return res.status(404).json({ data: 'Usuário não encontrado.' });
            }
            const response = yield users_1.default.findById(id);
            return res.status(200).json({ data: response });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (yield users_1.default.findOne({ 'email': data.email })) {
                return res.status(404).json({ data: 'Este e-mail já está em uso.' });
            }
            data.password = yield bcrypt.hash(data.password, bcrypt.genSaltSync(8));
            yield new users_1.default(data).save();
            return res.status(201).json({ data: 'Cadastro realizado com sucesso.' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(yield users_1.default.findOne({ '_id': id }))) {
                return res.status(404).json({ data: 'Usuário não encontrado.' });
            }
            let data = req.body;
            data.id = id;
            yield users_1.default.findOneAndUpdate({ _id: id }, req.body);
            return res.status(200).json({ data: data });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            if (!(yield users_1.default.findOne({ '_id': id }))) {
                return res.status(404).json({ data: 'Usuário não encontrado.' });
            }
            yield users_1.default.findByIdAndDelete(id);
            return res.status(200).json({ data: 'Deletado com sucesso.' });
        });
    }
}
exports.default = new Users;
