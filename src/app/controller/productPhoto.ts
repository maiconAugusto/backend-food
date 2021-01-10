import products from '../model/products';
import {Request, Response} from 'express';

class Products {
    async update(req: Request, res: Response) {
        const { id } = req.params;

        if (!(await products.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        await products.updateOne({'_id': id}, req.body);
        return res.status(200).json({data: 'Atualizado com sucesso.'});
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!(await products.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        await products.updateOne({'_id': id}, { image_url: '', image_path: ''});
        return res.status(200).json({data: 'Atualizado com sucesso.'});
    }
}
export default new Products;