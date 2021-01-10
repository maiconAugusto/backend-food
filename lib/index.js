"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./server/index"));
index_1.default.listen(process.env.PORT || 8081, () => {
    console.log('run');
});
//# sourceMappingURL=index.js.map