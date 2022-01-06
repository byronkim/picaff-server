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
const Shared_entity_1 = __importDefault(require("@entity/Shared.entity"));
const typeorm_1 = require("typeorm");
const shareItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (authorization) {
        try {
            yield (0, typeorm_1.getConnection)()
                .createQueryBuilder()
                .update(Shared_entity_1.default)
                .set({ count: () => 'count + 1' })
                .where('id = :id', { id: 1 })
                .execute();
            let sharedInfo = yield (0, typeorm_1.getRepository)(Shared_entity_1.default).findOne({ where: { id: 1 } });
            if (sharedInfo === undefined) {
                return res.status(404).send({ message: '정확한 정보를 입력해주세요.' });
            }
            else {
                return res.status(200).send({ count: sharedInfo.count });
            }
        }
        catch (err) {
            return res.status(404).send({ message: '문제가 발생했습니다.' });
        }
    }
    else {
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
    }
});
exports.default = shareItem;
//# sourceMappingURL=shareItem.js.map