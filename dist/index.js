"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./server/index");
index_1.default.listen(process.env.PORT || 8081, () => {
    console.log('run');
});
