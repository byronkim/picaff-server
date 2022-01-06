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
const addTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
    }
    else {
        const accessToken = req.headers.authorization.split(' ')[1];
        try {
            const verifyToken = jwt_1.default.verifyToken(accessToken);
            const testInfo = yield index_1.default.getTestResultInfo(verifyToken.id, req.body.testId, true);
            if (typeof testInfo === 'object') {
                return res.status(202).send(testInfo[0]);
            }
            else {
                return res.status(404).send({ message: testInfo });
            }
        }
        catch (err) {
            if (err.name) {
                /** 토큰이 만료되거나, 잘못된 엑세스 토큰으로 로그아웃 시도할때 **/
                return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
            }
            /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때 **/
            return res.status(404).send({ message: '회원 정보와 설문조사 자료가 일치하지 않습니다.' });
        }
    }
});
exports.default = addTest;
//# sourceMappingURL=addTest.js.map