"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("@middleware/cors"));
const cors_2 = __importDefault(require("cors"));
const index_1 = require("../router/index");
const typeorm_1 = require("typeorm");
require("dotenv");
const app = (0, express_1.default)();
/* Connect to Mysql */
(0, typeorm_1.createConnection)()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () { return console.log('Entity connected : ', connection.isConnected); }))
    .catch((err) => {
    console.log('Entity conncetion error : ', err);
});
/* set express setting */
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/* set cors */
app.use((0, cors_2.default)(cors_1.default));
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
    console.log('Hello world');
});
//router setup
app.use('/user', index_1.userRouter);
app.use('/item', index_1.itemRouter);
app.use('/test', index_1.testRouter);
exports.default = app;
//# sourceMappingURL=server.js.map