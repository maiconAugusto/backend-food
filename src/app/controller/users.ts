import users from '../model/users';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';

class Users {
    async index(req: Request, res: Response) {
        const response = await users.find();
        return res.status(200).json({data: response})
    }
    async show(req: Request, res: Response) {
        const { id } = req.params;
        if (!await users.findOne({'_id': id})) {
            return res.status(404).json({data: 'Usuário não encontrado.'})
        }
        const response = await users.findById(id);
        return res.status(200).json({data: response})
    }
    async create(req: Request, res: Response) {
        const data = req.body;
        if (await users.findOne({'email': data.email})) {
            return res.status(404).json({data: 'Este e-mail já está em uso.'})
        }
        data.password = await bcrypt.hash(data.password, bcrypt.genSaltSync(8)); 
 
        await new users(data).save();
        return res.status(201).json({data: 'Cadastro realizado com sucesso.'});
    }
    async update(req: Request, res: Response) {
        const { id } = req.params;
        if (!await users.findOne({'_id': id})) {
            return res.status(404).json({data: 'Usuário não encontrado.'})
        }
        let data = req.body;
        data.id = id;
        await users.findOneAndUpdate({_id: id}, req.body);
        return res.status(200).json({data: data})
    }
    async delete(req: Request, res: Response) {
        const { id } = req.body;
        if (!await users.findOne({'_id': id})) {
            return res.status(404).json({data: 'Usuário não encontrado.'})
        }
        await users.findByIdAndDelete(id);
        return res.status(200).json({data: 'Deletado com sucesso.'})
    }
}
export default new Users;