import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET || ''; // 32 bytes
const IV = process.env.ENCRYPTION_IV || ''; // 16 bytes

if (ENCRYPTION_KEY.length !== 32 || IV.length !== 16) {
  throw new Error(
    'Invalid encryption key or IV length. Key must be 32 bytes, IV must be 16 bytes.'
  );
}

const algorithm = 'aes-256-cbc';

export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(IV)
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(IV)
  );
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
