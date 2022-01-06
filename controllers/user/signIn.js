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
const bcrypt_1 = __importDefault(require("@middleware/bcrypt"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email === undefined || email === null || email === '') {
        return res.status(403).send({ message: '아이디와 비밀번호를 확인해주세요.' });
    }
    else if (password === undefined || password === null) {
        return res.status(403).send({ message: '아이디와 비밀번호를 확인해주세요.' });
    }
    try {
        const userInfo = yield index_1.default.getUserInfo(req.body.email, 'normal');
        const { id, email, userName, password } = userInfo;
        const isComparePassword = yield bcrypt_1.default.comparePassword(req.body.password, password);
        if (isComparePassword) {
            const accessToken = jwt_1.default.generateAccessToken(id, email, userName, 'normal');
            const refreshToken = jwt_1.default.generateRefreshToken(id, email, userName, 'normal');
            return res
                .status(200)
                .cookie('refreshToken', refreshToken, { httpOnly: true })
                .send({
                id: id,
                userName: userName,
                email: email,
                auth: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            });
        }
        else {
            return res.status(403).send({ message: '아이디와 비밀번호를 확인해주세요.' });
        }
    }
    catch (err) {
        /** 토큰으로 찾아낸 userId에 해당하는 유저가 데이터베이스에 존재하지 않을때
         ** 또는 토큰정보가 잘못되었거나, 토큰의 유효기간이 만료되었을때       **/
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
    }
});
exports.default = signIn;
//# sourceMappingURL=signIn.js.map