"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
const router = express_1.default.Router();
router.post('/signup', index_1.userController.signUp);
router.post('/email', index_1.userController.mail);
router.post('/google', index_1.userController.googleOauth);
router.post('/kakao', index_1.userController.kakaoOauth);
router.post('/signin', index_1.userController.signIn);
router.post('/signout', index_1.userController.signOut);
router.delete('/', index_1.userController.signOff);
router.patch('/', index_1.userController.modification);
router.patch('/test', index_1.userController.addTest);
router.get('/', index_1.userController.userInfo);
router.post('/email', index_1.userController.mail);
router.post('/token', index_1.userController.getAccessToken);
exports.default = router;
//# sourceMappingURL=userRouter.js.map