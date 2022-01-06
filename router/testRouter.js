"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const testController_1 = __importDefault(require("../controllers/testController"));
exports.default = router;
router.post('/', testController_1.default.post);
//# sourceMappingURL=testRouter.js.map