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
const bcrypt_1 = __importDefault(require("@middleware/bcrypt"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSignUpUser = yield index_1.default.isCheckedUser(req.body.email);
        if (isSignUpUser) {
            return res.status(403).send({ message: '이미 가입되어 있는 이메일 주소입니다.' });
        }
        else {
            if (req.body.email === '' || req.body.email === null) {
                return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' });
            }
            else {
                const password = yield bcrypt_1.default.cryptPassword(req.body.password);
                if (!password)
                    return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' });
                const user = yield index_1.default.createUser(req.body.email, req.body.userName, password, 'normal');
                const userInfo = yield index_1.default.getUserInfo(user.email, user.type);
                const { id, email, userName, type } = userInfo;
                res.status(201).send({
                    id: id,
                    email: email,
                    userName: userName,
                    type: type,
                });
            }
        }
    }
    catch (err) {
        return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' });
    }
});
exports.default = signUp;
//# sourceMappingURL=signUp.js.map