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
const questionnaire_1 = require("../model/questionnaire");
class Products {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield questionnaire_1.default.find();
            let data = response.sort(function (a, b) {
                return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
            });
            return res.status(200).json({ data: data });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield questionnaire_1.default.findById(id);
            if (!(yield questionnaire_1.default.findOne({ '_id': id }))) {
                return res.status(404).json({ data: 'Não encontrado.' });
            }
            return res.status(200).json({ data: response });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield new questionnaire_1.default(req.body).save();
            return res.status(201).json({ data: response });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(yield questionnaire_1.default.findOne({ _id: id }))) {
                return res.status(404).json({ data: 'Não encontrado.' });
            }
            yield questionnaire_1.default.updateOne({ '_id': id }, req.body);
            return res.status(200).json({ data: 'Atualizado com sucesso.' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!(yield questionnaire_1.default.findOne({ _id: id }))) {
                return res.status(404).json({ data: 'Não encontrado.' });
            }
            yield questionnaire_1.default.findByIdAndDelete(id);
            return res.status(200).json({ data: 'Deletado com sucesso.' });
        });
    }
}
exports.default = new Products;
