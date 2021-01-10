import {Request, Response} from 'express';
import product from '../model/products';

class Evaluations {
    async show(req: Request, res: Response) {
        const { id } = req.params;
        if (!(await product.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'});
        }
        const response = await product.findById(id);
        return res.status(200).json({data: response});
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!(await product.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'});
        }
        await product.updateOne({_id: id}, req.body);
        return res.status(200).json({data: 'Atualizado com sucesso.'});
    }
}
export default new Evaluations;