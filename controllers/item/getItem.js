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
const index_1 = __importDefault(require("@interface/index"));
const jwt_1 = __importDefault(require("@middleware/jwt"));
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.itemId) {
        return res.status(404).send('잘못된 정보가 입력되었습니다.');
    }
    else {
        if (req.headers.authorization) {
            const authorization = String(req.headers.authorization);
            const itemId = Number(req.query.itemId);
            const accessToken = authorization.split(' ')[1];
            const data = jwt_1.default.verifyToken(accessToken);
            const userId = data.id;
            const itemInfo = yield index_1.default.getItemInfo(itemId, userId);
            return res.status(200).send(itemInfo);
        }
        else {
            const itemId = Number(req.query.itemId);
            const itemInfo = yield index_1.default.getItemInfo(itemId, null);
            return res.status(200).send(itemInfo);
        }
    }
});
exports.default = getItem;
//# sourceMappingURL=getItem.js.map