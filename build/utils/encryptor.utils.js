"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET || ''; // 32 bytes
const IV = process.env.ENCRYPTION_IV || ''; // 16 bytes
if (ENCRYPTION_KEY.length !== 32 || IV.length !== 16) {
    throw new Error('Invalid encryption key or IV length. Key must be 32 bytes, IV must be 16 bytes.');
}
const algorithm = 'aes-256-cbc';
const encrypt = (text) => {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};
exports.encrypt = encrypt;
const decrypt = (encryptedText) => {
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(IV));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decrypt = decrypt;
