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
require("dotenv/config");
const google_auth_library_1 = require("google-auth-library");
const index_1 = __importDefault(require("@interface/index"));
const typeorm_1 = require("typeorm");
const User_entity_1 = __importDefault(require("@entity/User.entity"));
const googleOauth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const myToken = req.body.id_token;
	console.log('클라이언트는 ', client)
	console.log('토큰은 ', myToken)
    console.log('0')
	function verify() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken: myToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
		console.log('got the ticket.payload')
            if (typeof payload !== 'undefined') {
                const email = payload['email'];
                const userName = payload['name'];
                const password = payload['sub'];
                if (payload.email_verified) {
                    const checkUser = yield index_1.default.getGoogleUserInfo(email);
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
                        yield index_1.default.createUser(email, userName, password, 'OAuth');
                        const userInfo = yield (0, typeorm_1.getRepository)(User_entity_1.default)
                            .createQueryBuilder('user')
                            .where('user.email = :email', { email: email })
                            .andWhere('user.type = :type', { type: 'OAuth' })
                            .getOne();
                        if (typeof userInfo === 'undefined') {
                            console.log('이것은 정상적인 로그인시도')
				return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
                        }
                        const accessToken = jwt_1.default.generateAccessToken(userInfo.id, userInfo.email, userInfo.userName, 'OAuth');
                        const refreshToken = jwt_1.default.generateRefreshToken(userInfo.id, userInfo.email, userInfo.userName, 'OAuth');
                        return res
                            .status(201)
                            .cookie('refreshToken', refreshToken, { httpOnly: true })
                            .send({
                            id: userInfo.id,
                            userName: userInfo.userName,
                            email: userInfo.email,
                            auth: {
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            },
                        });
                    }
                }
                else {
			console.log('3')
                    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
                }
            }
            else {
		    console.log('4')
                return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
            }
        });
    }
    verify().catch((err) => {
        console.log('5')
	    return res.status(401).send({ message: '로그인상태와 엑세스토큰 확인이 필요합니다.' });
    });
});
exports.default = googleOauth;
//# sourceMappingURL=googleOauth.js.map
