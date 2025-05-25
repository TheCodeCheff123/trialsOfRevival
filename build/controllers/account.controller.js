"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.listAccounts = exports.createAccount = void 0;
const generateAccountNumber_util_1 = require("../utils/generateAccountNumber.util");
const card_util_1 = require("../utils/card.util");
const encryptor_utils_1 = require("../utils/encryptor.utils");
// In-memory storage for demo purposes
const accounts = [];
const existingAccountNumbers = new Set();
const existingCardNumbers = new Set();
const createAccount = (req, res) => {
    const { firstName, surname, email, phoneNumber, dateOfBirth } = req.body;
    if (!firstName || !surname || !email || !phoneNumber || !dateOfBirth) {
        res.status(400).json({ error: 'All fields are required' });
    }
    // Generate a unique account number
    let accountNumber = (0, generateAccountNumber_util_1.generateAccountNumber)();
    while (existingAccountNumbers.has(accountNumber)) {
        accountNumber = (0, generateAccountNumber_util_1.generateAccountNumber)();
    }
    existingAccountNumbers.add(accountNumber);
    // Generate unique card number
    let cardNumber;
    do {
        cardNumber = (0, card_util_1.generateCardNumber)(existingCardNumbers);
    } while (existingCardNumbers.has(cardNumber));
    existingCardNumbers.add(cardNumber);
    const cvv = (0, card_util_1.generateCVV)();
    const expiryDate = (0, card_util_1.generateExpiryDate)();
    // Encrypt sensitive fields
    const encryptedPhone = (0, encryptor_utils_1.encrypt)(phoneNumber);
    const encryptedDOB = (0, encryptor_utils_1.encrypt)(dateOfBirth);
    const encryptedCardNumber = (0, encryptor_utils_1.encrypt)(cardNumber);
    const encryptedCVV = (0, encryptor_utils_1.encrypt)(cvv);
    const encryptedExpiryDate = (0, encryptor_utils_1.encrypt)(expiryDate);
    const newAccount = {
        accountNumber,
        firstName,
        surname,
        email,
        phoneNumber: encryptedPhone,
        dateOfBirth: encryptedDOB,
        virtualCard: {
            cardNumber: encryptedCardNumber,
            cvv: encryptedCVV,
            expiryDate: encryptedExpiryDate
        }
    };
    accounts.push(newAccount);
    res.status(201).json({
        message: 'Account created',
        encrypted: newAccount,
        decrypted: {
            accountNumber,
            firstName,
            surname,
            email,
            phoneNumber,
            dateOfBirth,
            virtualCard: {
                cardNumber,
                cvv,
                expiryDate
            }
        }
    });
};
exports.createAccount = createAccount;
const listAccounts = (_req, res) => {
    const accountSummaries = accounts.map((account) => ({
        accountNumber: account.accountNumber,
        fullName: `${account.firstName} ${account.surname}`,
        encrypted: {
            phoneNumber: account.phoneNumber,
            dateOfBirth: account.dateOfBirth,
            virtualCard: {
                cardNumber: account.virtualCard.cardNumber,
                cvv: account.virtualCard.cvv,
                expiryDate: account.virtualCard.expiryDate
            }
        },
        decrypted: {
            phoneNumber: (0, encryptor_utils_1.decrypt)(account.phoneNumber),
            dateOfBirth: (0, encryptor_utils_1.decrypt)(account.dateOfBirth),
            virtualCard: {
                cardNumber: (0, encryptor_utils_1.decrypt)(account.virtualCard.cardNumber),
                cvv: (0, encryptor_utils_1.decrypt)(account.virtualCard.cvv),
                expiryDate: (0, encryptor_utils_1.decrypt)(account.virtualCard.expiryDate)
            }
        }
    }));
    return res.status(200).json({ accounts: accountSummaries });
};
exports.listAccounts = listAccounts;
const decryptData = (req, res) => {
    try {
        const { cardNumber, cvv, expiryDate, phoneNumber, dateOfBirth } = req.body;
        const decryptedData = {
            cardNumber: (0, encryptor_utils_1.decrypt)(cardNumber),
            cvv: (0, encryptor_utils_1.decrypt)(cvv),
            expiryDate: (0, encryptor_utils_1.decrypt)(expiryDate),
            phoneNumber: (0, encryptor_utils_1.decrypt)(phoneNumber),
            dateOfBirth: (0, encryptor_utils_1.decrypt)(dateOfBirth)
        };
        return res.status(200).json(decryptedData);
    }
    catch (error) {
        return res.status(400).json({ message: 'Failed to decrypt data', error });
    }
};
exports.decryptData = decryptData;
