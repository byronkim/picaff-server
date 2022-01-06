"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const console_1 = require("console");
dotenv_1.default.config();
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const token = {
    generateAccessToken(id, email, userName, type) {
        const userInfo = {
            id: id,
            userName: userName,
            email: email,
            type: type,
        };
        const accessToken = jsonwebtoken_1.default.sign(userInfo, ACCESS_SECRET, { expiresIn: '1h' });
        return accessToken;
    },
    generateRefreshToken(id, email, userName, type) {
        const userInfo = {
            id: id,
            userName: userName,
            email: email,
            type: type,
        };
        const RefreshToken = jsonwebtoken_1.default.sign(userInfo, REFRESH_SECRET, { expiresIn: '10h' });
        return RefreshToken;
    },
    verifyToken(token) {
        const userInfo = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        if (typeof userInfo === 'object')
            return userInfo;
        else
            throw new Error('token err');
    },
    verifyRefreshToken(token) {
        const userInfo = jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
        if (typeof userInfo === 'object')
            return userInfo;
        else
            throw (0, console_1.error)('String err');
    },
};
exports.default = token;
//# sourceMappingURL=jwt.js.map