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
const getTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = String(req.headers.authorization);
    if (authorization) {
        try {
            const itemType = String(req.query.itemType);
            const tagId = Number(req.query.tagId);
            const tagAndItemInfo = yield index_1.default.getTagAndItemInfo(tagId, itemType);
            const refined = tagAndItemInfo.map((el) => {
                return {
                    id: el.item.id,
                    itemName: el.item.itemName,
                    type: el.item.type,
                };
            });
            return res.status(200).send({
                tagId: tagAndItemInfo[0].tagId,
                tagName: tagAndItemInfo[0].tag.tagName,
                tagItemList: refined,
            });
        }
        catch (err) {
            return res.send(404).send({ message: '잘못된 정보가 입력되었습니다.' });
        }
    }
    else {
        return res.send(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
    }
});
exports.default = getTag;
//# sourceMappingURL=getTag.js.map