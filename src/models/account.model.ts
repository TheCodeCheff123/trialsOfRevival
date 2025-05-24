export interface VirtualCard {
  cardNumber: string; // unique 16-digit string
  expiryDate: string; // ISO date string (YYYY-MM-DD)
  cvv: string; // 3-digit string
  cardHolderName: string; // name on the card
  isActive: boolean; // status of the virtual card
}

export interface Account {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  accountNumber: string;
  virtualCard: VirtualCard;
}
export interface AccountWithId extends Account {
  id: string;
}
export interface AccountWithIdAndBalance extends AccountWithId {
  balance: number;
}
export interface AccountWithIdAndBalanceAndTransactions
  extends AccountWithIdAndBalance {
  transactions: string[];
}
export interface AccountWithIdAndBalanceAndTransactionsAndType
  extends AccountWithIdAndBalanceAndTransactions {
  accountType: string;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatus
  extends AccountWithIdAndBalanceAndTransactionsAndType {
  status: string;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCurrency
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatus {
  currency?: string;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAt
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatus {
  createdAt: Date;
}

export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAt
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAt {
  updatedAt: Date;
}
// eslint-disable-next-line max-len
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAt
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAt {
  closedAt?: Date;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRate
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAt {
  interestRate?: number;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRateAndCurrency
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRate {
  currency?: string;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRateAndCurrencyAndOverdraft
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRateAndCurrency {
  overdraft?: number;
}
export interface AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRateAndCurrencyAndOverdraftAndCreditScore
  extends AccountWithIdAndBalanceAndTransactionsAndTypeAndStatusAndCreatedAtAndUpdatedAtAndClosedAtAndInterestRateAndCurrencyAndOverdraft {
  creditScore?: number;
}
