"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../model/products"));
class Evaluations {
    async show(req, res) {
        const { id } = req.params;
        if (!(await products_1.default.findOne({ _id: id }))) {
            return res.status(404).json({ data: 'Produto não encontrado.' });
        }
        const response = await products_1.default.findById(id);
        return res.status(200).json({ data: response });
    }
    async update(req, res) {
        const { id } = req.params;
        if (!(await products_1.default.findOne({ _id: id }))) {
            return res.status(404).json({ data: 'Produto não encontrado.' });
        }
        await products_1.default.updateOne({ _id: id }, req.body);
        return res.status(200).json({ data: 'Atualizado com sucesso.' });
    }
}
exports.default = new Evaluations;
//# sourceMappingURL=productEvaluation.js.map