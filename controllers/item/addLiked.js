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
const typeorm_1 = require("typeorm");
const jwt_1 = __importDefault(require("@middleware/jwt"));
require("dotenv/config");
const Liked_entity_1 = __importDefault(require("@entity/Liked.entity"));
const addLiked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.itemId) {
        return res.send(404).send({ message: '정확한 정보를 입력해 주세요.' });
    }
    else {
        try {
            if (req.headers.authorization !== undefined) {
                if (req.headers.authorization) {
                    const authorization = req.headers.authorization;
                    const itemId = req.body.itemId;
                    const accessToken = authorization.split(' ')[1];
                    const data = jwt_1.default.verifyToken(accessToken);
                    const { id } = data;
                    const checkItemLiked = yield (0, typeorm_1.getRepository)(Liked_entity_1.default)
                        .createQueryBuilder('liked')
                        .where('liked.userId = :userId', { userId: id })
                        .andWhere('liked.itemId = :itemId', { itemId: itemId })
                        .getOne();
                    if (checkItemLiked) {
                        yield (0, typeorm_1.getConnection)()
                            .createQueryBuilder()
                            .delete()
                            .from(Liked_entity_1.default)
                            .where({ userId: id })
                            .execute();
                        return res.status(202).send();
                    }
                    else {
                        const liked = new Liked_entity_1.default();
                        liked.userId = id;
                        liked.itemId = itemId;
                        yield (0, typeorm_1.getRepository)(Liked_entity_1.default).save(liked);
                        return res.status(200).send(liked);
                    }
                }
                else {
                    return res.status(401).send('로그인상태와 엑세스토큰 확인이 필요합니다.');
                }
            }
            else {
                return res.status(401).send('로그인상태와 엑세스토큰 확인이 필요합니다.');
            }
        }
        catch (err) {
            return res.status(401).send('로그인상태와 엑세스토큰 확인이 필요합니다.');
        }
    }
});
exports.default = addLiked;
//# sourceMappingURL=addLiked.js.map