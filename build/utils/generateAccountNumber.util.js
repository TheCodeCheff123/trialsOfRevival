"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccountNumber = void 0;
// Generates a unique 10-digit account number as string
const generateAccountNumber = () => {
    // For simplicity, generate a random 10-digit number
    // In a real app, you'd check for uniqueness in DB or use a sequence
    const min = 1000000000; // smallest 10-digit number
    const max = 9999999999; // largest 10-digit number
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
exports.generateAccountNumber = generateAccountNumber;
