
import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import SECRET from '../config/hash';

 class Middleware {
    async Middleware(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            return res.status(401).json({data: 'Acesso negado.'})
        }
        const [ bearer, token ] = authHeader.split(' ')
        try{
            await promisify(jwt.verify)(token, SECRET.hash, { expiresIn: SECRET.expiresIn})
            return next() 
        }
        catch(err){
            return res.status(401).json({error: 'token invalido'})
        }
    }
 }
export default new Middleware;