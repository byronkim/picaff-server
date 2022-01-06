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
const getAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.cookie && req.headers.cookie !== 'refreshToken=') {
            const refreshToken = req.headers.cookie.split('=')[1];
            const userInfo = jwt_1.default.verifyRefreshToken(refreshToken);
            const { id, email, userName, type } = userInfo;
            const accessToken = jwt_1.default.generateAccessToken(id, email, userName, type);
            return res.status(400).send({ accessToken });
        }
        else {
            if (req.body.refreshToken) {
                const refreshToken = req.body.refreshToken;
                const userInfo = jwt_1.default.verifyRefreshToken(refreshToken);
                const { id, email, userName, type } = userInfo;
                const accessToken = jwt_1.default.generateAccessToken(id, email, userName, type);
                return res.status(400).send({ accessToken });
            }
            else {
                return res.status(401).send({ message: '권한이 없습니다.' });
            }
        }
    }
    catch (err) {
        return res.status(401).send({ message: '권한이 없습니다.' });
    }
});
exports.default = getAccessToken;
//# sourceMappingURL=getAccessToken.js.map