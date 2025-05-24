import type { Request, Response } from 'express';
import { generateAccountNumber } from '../utils/generateAccountNumber.util';
import {
  generateCardNumber,
  generateCVV,
  generateExpiryDate
} from '../utils/card.util';
import { encrypt, decrypt } from '../utils/encryptor.utils';
import type { Account } from '../types/account';

// In-memory storage for demo purposes
const accounts: Account[] = [];

const existingAccountNumbers = new Set<string>();
const existingCardNumbers = new Set<string>();

export const createAccount = (req: Request, res: Response): void => {
  const { firstName, surname, email, phoneNumber, dateOfBirth } = req.body;

  if (!firstName || !surname || !email || !phoneNumber || !dateOfBirth) {
    res.status(400).json({ error: 'All fields are required' });
  }

  // Generate a unique account number
  let accountNumber = generateAccountNumber();
  while (existingAccountNumbers.has(accountNumber)) {
    accountNumber = generateAccountNumber();
  }
  existingAccountNumbers.add(accountNumber);

  // Generate unique card number
  let cardNumber: string;
  do {
    cardNumber = generateCardNumber(existingCardNumbers);
  } while (existingCardNumbers.has(cardNumber));
  existingCardNumbers.add(cardNumber);

  const cvv = generateCVV();
  const expiryDate = generateExpiryDate();

  // Encrypt sensitive fields
  const encryptedPhone = encrypt(phoneNumber);
  const encryptedDOB = encrypt(dateOfBirth);
  const encryptedCardNumber = encrypt(cardNumber);
  const encryptedCVV = encrypt(cvv);
  const encryptedExpiryDate = encrypt(expiryDate);

  const newAccount: Account = {
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

export const listAccounts = (_req: Request, res: Response): Response => {
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
      phoneNumber: decrypt(account.phoneNumber),
      dateOfBirth: decrypt(account.dateOfBirth),
      virtualCard: {
        cardNumber: decrypt(account.virtualCard.cardNumber),
        cvv: decrypt(account.virtualCard.cvv),
        expiryDate: decrypt(account.virtualCard.expiryDate)
      }
    }
  }));

  return res.status(200).json({ accounts: accountSummaries });
};

export const decryptData = (req: Request, res: Response): Response => {
  try {
    const { cardNumber, cvv, expiryDate, phoneNumber, dateOfBirth } = req.body;

    const decryptedData = {
      cardNumber: decrypt(cardNumber),
      cvv: decrypt(cvv),
      expiryDate: decrypt(expiryDate),
      phoneNumber: decrypt(phoneNumber),
      dateOfBirth: decrypt(dateOfBirth)
    };

    return res.status(200).json(decryptedData);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to decrypt data', error });
  }
};
