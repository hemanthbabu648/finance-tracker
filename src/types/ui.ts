export type StatsResponse = {
  title: string;
  value: string;
  change?: string;
  category?: string;
  description?: string;
  icon: React.ReactNode;
  bgColor: string;
};

export enum AccountTypeEnum {
  SAVINGS = 'SAVINGS',
  CASH = 'CASH',
  SALARY = 'SALARY',
  CREDIT_CARD = 'CREDIT CARD',
  E_WALLET = 'E-WALLET',
  E_ACCOUNT = 'E-ACCOUNT',
  CURRENT = 'CURRENT',
  CURRENT_SAVINGS = 'CURRENT/SAVINGS',
}

export type AccountType = {
  label: string;
  value: AccountTypeEnum;
};

export interface Category {
  label: string;
  value: string;
}

export type TransactionTypeValue =
  | 'INCOME'
  | 'EXPENSE'
  | 'TRANSFER'
  | 'BORROW'
  | 'LEND';

export type TransactionType = {
  label: string;
  value: TransactionTypeValue;
};

export type LendTabValues = 'GIVEN' | 'RECEIVED';

export type BorrowTabValues = 'TAKEN' | 'RETURNED';

export type BorrowLendTabTypes = {
  label: string;
  value: BorrowTabValues | LendTabValues;
};
