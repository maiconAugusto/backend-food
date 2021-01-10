import users from '../model/users';
import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';

class Users {
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {password, newPassword } = req.body;

        const response = await users.findOne({'_id': id});

        if (!response) {
            return res.status(404).json({data: 'Usuário não encontrado.'})
        }
        const passwordDB: any = response;

        const hash = await bcrypt.compare(password, passwordDB.password);

        if (!hash) {
            return res.status(401).json({data: 'Senha atual incorreta, tente novamente.'});
        }

        const newHash = await bcrypt.hash(newPassword, bcrypt.genSaltSync(8));

        await users.findOneAndUpdate({_id: id}, {'password': newHash});
        return res.status(200).json({data: 'Atualizado com sucesso.'})
    }
}
export default new Users;