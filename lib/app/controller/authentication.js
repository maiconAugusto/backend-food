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
const users_1 = __importDefault(require("../model/users"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const hash_1 = __importDefault(require("../../config/hash"));
class Authentication {
    async show(req, res) {
        const { email, password } = req.body;
        const response = await users_1.default.findOne({ 'email': email });
        if (!response) {
            return res.status(401).json({ data: 'E-mail não encontrado.' });
        }
        const userData = response;
        const hash = await bcrypt.compare(password, userData.password);
        if (!hash) {
            return res.status(401).json({ data: 'Senha incorreta.' });
        }
        const data = {
            id: userData._id,
            email: userData.email,
            name: userData.name,
            lastName: userData.lastName,
            token: jwt.sign({ id: userData.id }, hash_1.default.hash, {
                expiresIn: hash_1.default.expiresIn,
            })
        };
        return res.status(200).json({ data });
    }
}
exports.default = new Authentication;
//# sourceMappingURL=authentication.js.map