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
const crawling_1 = __importDefault(require("@middleware/crawling"));
const crawling = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield crawling_1.default.getData(req.body.itemName);
        return res.status(200).send(data);
    }
    catch (err) {
        return res.status(403).send({ message: '정확한 정보를 입력해주세요' });
    }
});
exports.default = crawling;
//# sourceMappingURL=crawling.js.map