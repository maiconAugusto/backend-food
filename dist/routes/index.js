"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../app/controller/users");
const userPassword_1 = require("../app/controller/userPassword");
const authentication_1 = require("../app/controller/authentication");
const products_1 = require("../app/controller/products");
const productPhoto_1 = require("../app/controller/productPhoto");
const productEvaluation_1 = require("../app/controller/productEvaluation");
const solicitation_1 = require("../app/controller/solicitation");
const auth_1 = require("../middleware/auth");
const medicine_1 = require("../app/controller/medicine");
const index_1 = require("../storage/index");
const multer = require("multer");
const multer_1 = require("../config/multer");
const upload = multer(multer_1.default);
class Routes {
    constructor() {
        this.routes = express_1.Router();
        this.url();
    }
    url() {
        this.routes.post('/authentication', authentication_1.default.show);
        this.routes.get('/users', auth_1.default.Middleware, users_1.default.index);
        this.routes.get('/user/:id', auth_1.default.Middleware, users_1.default.show);
        this.routes.post('/create-user', upload.single('file'), index_1.default.uploadFile, users_1.default.create);
        this.routes.put('/update-user/:id', upload.single('file'), index_1.default.updateFile, users_1.default.update);
        this.routes.put('/update-password/:id', userPassword_1.default.update);
        this.routes.delete('/delete-user/:id', users_1.default.delete);
        this.routes.get('/products/:id', products_1.default.index);
        this.routes.get('/product/:id', products_1.default.show);
        this.routes.post('/product', upload.single('file'), index_1.default.uploadFile, products_1.default.create);
        this.routes.put('/product/:id', products_1.default.update);
        this.routes.put('/product-photo/:path_buket/:id', upload.single('file'), index_1.default.updateFile, productPhoto_1.default.update);
        this.routes.delete('/product-photo/:path_buket/:id', index_1.default.removeFile, productPhoto_1.default.delete);
        this.routes.delete('/product/:id', products_1.default.delete);
        this.routes.get('/product-evaluation/:id', productEvaluation_1.default.show);
        this.routes.put('/product-evaluation/:id', productEvaluation_1.default.update);
        this.routes.get('/solicitations/:id', solicitation_1.default.index);
        this.routes.get('/solicitation/:id', solicitation_1.default.show);
        this.routes.post('/solicitation', solicitation_1.default.create);
        this.routes.delete('/solicitation/:id', solicitation_1.default.delete);
        this.routes.put('/solicitation/:id', solicitation_1.default.update);
        // TESTE
        this.routes.get('/quests/:id', medicine_1.default.index);
        this.routes.get('/quest/:id', medicine_1.default.show);
        this.routes.post('/quest', medicine_1.default.create);
        this.routes.delete('/quest/:id', medicine_1.default.delete);
        this.routes.put('/quest/:id', medicine_1.default.update);
    }
}
exports.default = new Routes().routes;
