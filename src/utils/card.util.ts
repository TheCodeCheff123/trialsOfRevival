export const generateCardNumber = (existingNumbers: Set<string>): string => {
  let number: string;
  do {
    number = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 10)
    ).join('');
  } while (existingNumbers.has(number));
  return number;
};

export const generateCVV = (): string => {
  return Math.floor(100 + Math.random() * 900).toString();
};

export const generateExpiryDate = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 3);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${year}`;
};
