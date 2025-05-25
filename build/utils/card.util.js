"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateExpiryDate = exports.generateCVV = exports.generateCardNumber = void 0;
const generateCardNumber = (existingNumbers) => {
    let number;
    do {
        number = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
    } while (existingNumbers.has(number));
    return number;
};
exports.generateCardNumber = generateCardNumber;
const generateCVV = () => {
    return Math.floor(100 + Math.random() * 900).toString();
};
exports.generateCVV = generateCVV;
const generateExpiryDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 3);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${year}`;
};
exports.generateExpiryDate = generateExpiryDate;
