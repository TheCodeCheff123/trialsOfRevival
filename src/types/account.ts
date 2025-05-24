export interface VirtualCard {
  cardNumber: string; // unique 16-digit string
  expiryDate: string; // ISO date string (YYYY-MM)
  cvv: string; // 3-digit string
}

export interface Account {
  accountNumber: string; // unique 10-digit string
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // ISO date string
  virtualCard: VirtualCard; // virtual card details
}
