import {Request, Response} from 'express';
import solicitation from '../model/solicitations';

class Solicitation {
    async index(req: Request, res: Response) {
        const { id } = req.params;
        const response = await solicitation.find({'solicitation.storeId': id});
        return res.status(200).json({data: response});
    }
    async show (req: Request, res: Response) {
        const { id } = req.params;
        if (!(await solicitation.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        const response = await solicitation.findOne({_id: id});
        return res.status(200).json({data: response});
    }
    async create (req: any, res: Response) {
        
        const response = await new solicitation(req.body).save();
        const io = req.io;
        io.emit('MESSAGE', response);
        return res.status(200).json({data: response});
    }
    async update (req: Request, res: Response) {
        const { id } = req.params;

        if (!(await solicitation.findOne({_id: id}))) {
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        await solicitation.updateOne({'_id': id}, req.body);
        return res.status(200).json({data: 'Atualizado com sucesso.'});
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        if (!(await solicitation.findOne({_id: id}))) { 
            return res.status(404).json({data: 'Produto não encontrado.'})
        }
        await solicitation.findByIdAndDelete(id)
        return res.status(200).json({data: 'Deletado com sucesso.'});
    }
}   
export default new Solicitation; 