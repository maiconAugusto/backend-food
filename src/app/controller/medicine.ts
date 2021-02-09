import medicine from '../model/medicine';
import {Request, Response} from 'express';

class Products {
    async index(req: Request, res: Response) {
        const response = await medicine.find();
        let data = response.sort(function(a,b) {
            return a.product < b.product ? -1 : a.product > b.product ? 1 : 0;
        });
        return res.status(200).json({data: data});
    }
    async show(req: Request, res: Response) {
        const { id } = req.params;
        const response = await medicine.findById(id);

        if (!(await medicine.findOne({'_id': id}))) {
            return res.status(404).json({data: 'Producto não encontrado.'})
        }

        return res.status(200).json({data: response});
    }
    async create(req: Request, res: Response) {
        const response = await new medicine(req.body).save();
        return res.status(201).json({data: response});
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;

        if (!(await medicine.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        await medicine.updateOne({'_id': id}, req.body);
        return res.status(200).json({data: 'Atualizado com sucesso.'});
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        if (!(await medicine.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        await medicine.findByIdAndDelete(id);
        return res.status(200).json({data: 'Deletado com sucesso.'})
    }
}
export default new Products;