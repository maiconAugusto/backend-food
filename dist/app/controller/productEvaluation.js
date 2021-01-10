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
const products_1 = require("../model/products");
class Evaluations {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(yield products_1.default.findOne({ _id: id }))) {
                return res.status(404).json({ data: 'Produto não encontrado.' });
            }
            const response = yield products_1.default.findById(id);
            return res.status(200).json({ data: response });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(yield products_1.default.findOne({ _id: id }))) {
                return res.status(404).json({ data: 'Produto não encontrado.' });
            }
            yield products_1.default.updateOne({ _id: id }, req.body);
            return res.status(200).json({ data: 'Atualizado com sucesso.' });
        });
    }
}
exports.default = new Evaluations;
