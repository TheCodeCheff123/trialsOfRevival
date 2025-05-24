// Generates a unique 10-digit account number as string
export const generateAccountNumber = (): string => {
  // For simplicity, generate a random 10-digit number
  // In a real app, you'd check for uniqueness in DB or use a sequence
  const min = 1_000_000_000; // smallest 10-digit number
  const max = 9_999_999_999; // largest 10-digit number
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
