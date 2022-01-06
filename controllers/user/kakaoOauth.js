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
const axios_1 = __importDefault(require("axios"));
const index_1 = __importDefault(require("@interface/index"));
const kakaoOauth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = req.body.access_token;
    try {
        const verifyTokenInfo = yield (0, axios_1.default)({
            method: 'POST',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const id = verifyTokenInfo.data.id;
        const properties = verifyTokenInfo.data.properties;
        if (verifyTokenInfo.status === 200) {
            const checkUser = yield index_1.default.getKakaoUserInfo('kakaoUser' + id);
            if (checkUser) {
                const accessToken = jwt_1.default.generateAccessToken(checkUser.id, checkUser.email, checkUser.userName, 'OAuth');
                const refreshToken = jwt_1.default.generateRefreshToken(checkUser.id, checkUser.email, checkUser.userName, 'OAuth');
                return res
                    .status(200)
                    .cookie('refreshToken', refreshToken, { httpOnly: true })
                    .send({
                    id: checkUser.id,
                    userName: checkUser.userName,
                    email: checkUser.email,
                    auth: {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    },
                });
            }
            else {
                yield index_1.default.createUser('kakaoUser' + `${id}`, properties.nickname, 'kakaoOauth', 'OAuth');
                const oauthUserInfo = yield index_1.default.getKakaoUserInfo('kakaoUser' + id);
                if (oauthUserInfo !== undefined) {
                    const accessToken = jwt_1.default.generateAccessToken(oauthUserInfo.id, oauthUserInfo.email, oauthUserInfo.userName, 'OAuth');
                    const refreshToken = jwt_1.default.generateRefreshToken(oauthUserInfo.id, oauthUserInfo.email, oauthUserInfo.userName, 'OAuth');
                    return res
                        .status(201)
                        .cookie('refreshToken', refreshToken, { httpOnly: true })
                        .send({
                        id: oauthUserInfo.id,
                        userName: oauthUserInfo.userName,
                        email: oauthUserInfo.email,
                        auth: {
                            accessToken: accessToken,
                        },
                    });
                }
            }
        }
    }
    catch (err) {
        return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
    }
});
exports.default = kakaoOauth;
//# sourceMappingURL=kakaoOauth.js.map