"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controllers/account.controller");
const router = express_1.default.Router();
router.post('/accounts', account_controller_1.createAccount);
router.get('/accounts', account_controller_1.listAccounts);
router.post('/decrypt', account_controller_1.decryptData);
exports.default = router;
