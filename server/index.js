"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
require("dotenv/config");
server_1.default.set('port', process.env.EX_PORT);
server_1.default
    .listen(server_1.default.get('port'), () => {
    console.log(`App is listening on PORT ${server_1.default.get('port')} `);
})
    .on('error', (err) => console.error('failed to connect with server')); // 서버 에러시 코드
//# sourceMappingURL=index.js.map