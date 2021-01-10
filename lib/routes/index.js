"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../app/controller/users"));
const authentication_1 = __importDefault(require("../app/controller/authentication"));
const products_1 = __importDefault(require("../app/controller/products"));
const productEvaluation_1 = __importDefault(require("../app/controller/productEvaluation"));
const auth_1 = __importDefault(require("../middleware/auth"));
const index_1 = __importDefault(require("../storage/index"));
const multer = __importStar(require("multer"));
const multer_1 = __importDefault(require("../config/multer"));
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
        this.routes.post('/create-user', users_1.default.create);
        this.routes.put('/update-user/:id', users_1.default.update);
        this.routes.delete('/delete-user/:id', users_1.default.delete);
        this.routes.get('/products', products_1.default.index);
        this.routes.get('/product/:id', products_1.default.show);
        this.routes.post('/product', upload.single('file'), index_1.default.uploadFile, products_1.default.create);
        this.routes.put('/product/:id', upload.single('file'), index_1.default.updateFile, products_1.default.update);
        this.routes.delete('/product/:id', products_1.default.delete);
        this.routes.get('/product-evaluation/:id', productEvaluation_1.default.show);
        this.routes.put('/product-evaluation/:id', productEvaluation_1.default.update);
    }
}
exports.default = new Routes().routes;
//# sourceMappingURL=index.js.map