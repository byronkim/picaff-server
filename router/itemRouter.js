"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', index_1.itemController.getItem);
router.get('/all', index_1.itemController.getAllItems);
router.post('/sharing', index_1.itemController.sharing);
router.put('/liked', index_1.itemController.addLiked);
router.get('/tag', index_1.itemController.getTag);
router.post('/crawling', index_1.itemController.crawling);
exports.default = router;
//# sourceMappingURL=itemRouter.js.map