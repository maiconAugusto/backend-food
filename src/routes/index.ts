import {Router} from 'express';
import Users from '../app/controller/users';
import UserPassword from '../app/controller/userPassword';
import Auth from '../app/controller/authentication';
import Products from '../app/controller/products';
import ProductPhoto from '../app/controller/productPhoto';
import Evaluations from '../app/controller/productEvaluation';
import Solicitation from '../app/controller/solicitation';
import JWTM from '../middleware/auth';
import Medicine from '../app/controller/medicine';
import Bucket from '../storage/index';
import * as multer from 'multer';
import storage from '../config/multer';
const upload = multer(storage);

class Routes {
    public routes: Router;
    constructor() {
        this.routes = Router();
        this.url();
    }
    url() {
        this.routes.post('/authentication', Auth.show);
        this.routes.get('/users', JWTM.Middleware, Users.index);
        this.routes.get('/user/:id', JWTM.Middleware, Users.show);
        this.routes.post('/create-user', upload.single('file'), Bucket.uploadFile, Users.create);
        this.routes.put('/update-user/:id', upload.single('file'), Bucket.updateFile, Users.update);
        this.routes.put('/update-password/:id', UserPassword.update);
        this.routes.delete('/delete-user/:id', Users.delete);

        this.routes.get('/products/:id', Products.index);
        this.routes.get('/product/:id', Products.show);
        this.routes.post('/product', upload.single('file'), Bucket.uploadFile, Products.create);
        this.routes.put('/product/:id', Products.update);
        this.routes.put('/product-photo/:path_buket/:id', upload.single('file'), Bucket.updateFile, ProductPhoto.update);
        this.routes.delete('/product-photo/:path_buket/:id', Bucket.removeFile, ProductPhoto.delete);
        this.routes.delete('/product/:id', Products.delete);

        this.routes.get('/product-evaluation/:id', Evaluations.show);
        this.routes.put('/product-evaluation/:id', Evaluations.update);

        this.routes.get('/solicitations/:id', Solicitation.index);
        this.routes.get('/solicitation/:id', Solicitation.show);
        this.routes.post('/solicitation', Solicitation.create);
        this.routes.delete('/solicitation/:id', Solicitation.delete);
        this.routes.put('/solicitation/:id', Solicitation.update);
 
        // TESTE
        this.routes.get('/quests/:id', Medicine.index);
        this.routes.get('/quest/:id', Medicine.show);
        this.routes.post('/quest', Medicine.create);
        this.routes.delete('/quest/:id', Medicine.delete);
        this.routes.put('/quest/:id', Medicine.update);
    }
    
}
export default new Routes().routes;