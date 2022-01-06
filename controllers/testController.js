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
const test_1 = __importDefault(require("@interface/test"));
exports.default = {
    post: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("test요청이 들어왔습니다.");
            if (!req.body.score)
                return res.status(404).send({ message: '설문조사를 다시 진행해주세요' });
            const { score } = req.body;
            if (score.includes(null)) {
                return res.status(404).send({ message: '설문조사를 다시 진행해주세요' });
            }
            const arr = score;
            const coffeeScore = arr.splice(0, 6);
            const productScore = arr.splice(0, 5);
            const coffeeIndex = test_1.default.resultCoffee(coffeeScore);
            const productIndex = test_1.default.resultProduct(productScore);
            const isLogin = req.headers.authorization;
            if (typeof isLogin === 'string' && isLogin !== 'null') {
                const accessToken = isLogin.split(' ')[1];
                const verifyToken = jwt_1.default.verifyToken(accessToken);
                const userInfo = yield index_1.default.getUserInfo(verifyToken.email, verifyToken.type);
                if (typeof userInfo === 'undefined') {
                    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
                }
                if (verifyToken.id !== userInfo.id) {
                    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
                }
                const testResultInfo = yield index_1.default.createTestInfo(userInfo.id, coffeeIndex, productIndex);
                const coffeeResult = yield index_1.default.getItemInfo(coffeeIndex, userInfo.id);
                const productResult = yield index_1.default.getItemInfo(productIndex, userInfo.id);
                return res.status(200).send({ testResultInfo, coffeeResult, productResult });
            }
            else {
                const testResultInfo = yield index_1.default.createTestInfo(null, coffeeIndex, productIndex);
                const coffeeResult = yield index_1.default.getItemInfo(coffeeIndex, null);
                const productResult = yield index_1.default.getItemInfo(productIndex, null);
                return res.status(200).send({ testResultInfo, coffeeResult, productResult });
            }
        }
        catch (_a) {
            return res.status(404).send({ message: '설문조사를 다시 진행해주세요' });
        }
    }),
};
//# sourceMappingURL=testController.js.map