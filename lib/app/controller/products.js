"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = __importDefault(require("../model/products"));
class Products {
    async index(req, res) {
        const response = await products_1.default.find();
        return res.status(200).json({ data: response });
    }
    async show(req, res) {
        const { id } = req.params;
        const response = await products_1.default.findById(id);
        if (!(await products_1.default.findOne({ '_id': id }))) {
            return res.status(404).json({ data: 'Producto não encontrado.' });
        }
        return res.status(200).json({ data: response });
    }
    async create(req, res) {
        const response = await new products_1.default(req.body).save();
        return res.status(201).json({ data: response });
    }
    async update(req, res) {
        const { id } = req.params;
        if (!(await products_1.default.findOne({ _id: id }))) {
            return res.status(404).json({ data: 'Produto não encontrado.' });
        }
        await products_1.default.updateOne({ '_id': id }, req.body);
        return res.status(200).json({ data: 'Atualizado com sucesso.' });
    }
    async delete(req, res) {
        const { id } = req.params;
        if (!(await products_1.default.findOne({ _id: id }))) {
            return res.status(404).json({ data: 'Produto não encontrado.' });
        }
        await products_1.default.findByIdAndDelete(id);
        return res.status(200).json({ data: 'Deletado com sucesso.' });
    }
}
exports.default = new Products;
//# sourceMappingURL=products.js.map