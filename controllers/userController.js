"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userHandler_1 = require("./user/userHandler");
exports.default = {
    signUp: userHandler_1.signUp,
    signIn: userHandler_1.signIn,
    mail: userHandler_1.mail,
    signOut: userHandler_1.signOut,
    googleOauth: userHandler_1.googleOauth,
    kakaoOauth: userHandler_1.kakaoOauth,
    signOff: userHandler_1.signOff,
    modification: userHandler_1.modification,
    addTest: userHandler_1.addTest,
    userInfo: userHandler_1.userInfo,
    getAccessToken: userHandler_1.getAccessToken,
};
//# sourceMappingURL=userController.js.map