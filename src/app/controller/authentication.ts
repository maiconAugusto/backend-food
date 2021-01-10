import {Request, Response} from 'express';
import user from '../model/users';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import SECRET from '../../config/hash';

class Authentication {
    async show(req: Request, res: Response) {
        const { email, password } = req.body;
        const response = await user.findOne({'email': email});
        
        if (!response) {
            return res.status(401).json({data: 'E-mail não encontrado.'});
        }

        const userData: any = response;
        const hash = await bcrypt.compare(password, userData.password);

        if (!hash) {
            return res.status(401).json({data: 'Senha incorreta.'});
        }
        const data = {
            id: userData._id,
            email: userData.email,
            name: userData.name,
            lastName: userData.lastName,
            image_url: userData.image_url,
            image_path: userData.image_path,
            storeName: userData.storeName,
            token: jwt.sign({id: userData.id}, SECRET.hash, {
                expiresIn: SECRET.expiresIn,
            })
        }
        return res.status(200).json({data});
    }
}
export default new Authentication;