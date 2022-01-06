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
const jwt_1 = __importDefault(require("@middleware/jwt"));
const index_1 = __importDefault(require("@interface/index"));
const typeorm_1 = require("typeorm");
const Item_entity_1 = __importDefault(require("@entity/Item.entity"));
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.type) {
            return res.status(404).send({ message: '잘못된 정보가 입력되었습니다.' });
        }
        else {
            let type;
            if (req.query.type === 'coffee')
                type = 'coffee';
            else if (req.query.type === 'product')
                type = 'product';
            else
                type = '';
            if (req.headers.authorization) {
                const accessToken = req.headers.authorization.split(' ')[1];
                const verifyToken = jwt_1.default.verifyToken(accessToken);
                const userInfo = yield index_1.default.getUserInfo(verifyToken.email, verifyToken.type);
                if (verifyToken.id !== userInfo.id) {
                    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
                }
                const itemEntity = yield (0, typeorm_1.getRepository)(Item_entity_1.default).find({ where: { type: type } });
                if (!itemEntity)
                    return res.status(403).send({ message: '정확한 정보를 입력해주세요.' });
                const itemsInfo = yield Promise.all(itemEntity.map((data) => {
                    const itemInfo = index_1.default.getItemInfo(data.id, verifyToken.id);
                    return itemInfo;
                }));
                return res.status(200).send(itemsInfo);
            }
            else {
                const itemEntity = yield (0, typeorm_1.getRepository)(Item_entity_1.default).find({ where: { type: type } });
                if (!itemEntity)
                    return res.status(403).send({ message: '정확한 정보를 입력해주세요.' });
                const itemsInfo = yield Promise.all(itemEntity.map((data) => {
                    const itemInfo = index_1.default.getItemInfo(data.id, null);
                    return itemInfo;
                }));
                return res.status(200).send(itemsInfo);
            }
        }
    }
    catch (err) {
        return res.status(403).send({ message: '정확한 정보를 입력해 주세요.' });
    }
});
exports.default = getAllItems;
//# sourceMappingURL=getAllItems.js.map