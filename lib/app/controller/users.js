"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../model/users"));
const bcrypt = __importStar(require("bcrypt"));
class Users {
    async index(req, res) {
        const response = await users_1.default.find();
        return res.status(200).json({ data: response });
    }
    async show(req, res) {
        const { id } = req.params;
        if (!await users_1.default.findOne({ '_id': id })) {
            return res.status(404).json({ data: 'Usuário não encontrado.' });
        }
        const response = await users_1.default.findById(id);
        return res.status(200).json({ data: response });
    }
    async create(req, res) {
        const data = req.body;
        if (await users_1.default.findOne({ 'email': req.body.email })) {
            return res.status(404).json({ data: 'Este e-mail já está em uso.' });
        }
        req.body.password = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(8));
        await new users_1.default(data).save();
        return res.status(201).json({ data: 'Cadastro realizado com sucesso.' });
    }
    async update(req, res) {
        const { id } = req.params;
        if (!await users_1.default.findOne({ '_id': id })) {
            return res.status(404).json({ data: 'Usuário não encontrado.' });
        }
        await users_1.default.updateOne({ _id: id }, req.body);
        return res.status(200).json({ data: 'Atualizado com sucesso.' });
    }
    async delete(req, res) {
        const { id } = req.body;
        if (!await users_1.default.findOne({ '_id': id })) {
            return res.status(404).json({ data: 'Usuário não encontrado.' });
        }
        await users_1.default.findByIdAndDelete(id);
        return res.status(200).json({ data: 'Deletado com sucesso.' });
    }
}
exports.default = new Users;
//# sourceMappingURL=users.js.map