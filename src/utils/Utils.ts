import { AccountResponse } from '@/types';
import { AccountType, AccountTypeEnum, Category } from '@/types/ui';

export const getCategories = {
  EXPENSE: [
    {
      label: 'Rent',
      value: 'RENT',
    },
    {
      label: 'Food',
      value: 'FOOD',
    },
    {
      label: 'Snacks',
      value: 'SNACKS',
    },
    {
      label: 'Transportation',
      value: 'TRANSPORTATION',
    },
    {
      label: 'Entertainment',
      value: 'ENTERTAINMENT',
    },
    {
      label: 'Health & Insurance',
      value: 'HEALTH_INSURANCE',
    },
    {
      label: 'Savings & Investments',
      value: 'SAVINGS_INVESTMENTS',
    },
    {
      label: 'Clothing',
      value: 'CLOTHING',
    },
    {
      label: 'Education & Courses',
      value: 'EDUCATION',
    },
    {
      label: 'Bills',
      value: 'BILLS',
    },
    {
      label: 'Credit Card Payments',
      value: 'CREDIT_CARD_PAYMENTS',
    },
    {
      label: 'Personal Care',
      value: 'PERSONAL_CARE',
    },
    {
      label: 'Gifts & Donations',
      value: 'GIFTS_DONATIONS',
    },
    {
      label: 'Electronics',
      value: 'ELECTRONICS',
    },
    {
      label: 'Grocery',
      value: 'GROCERY',
    },
    {
      label: 'Accessories',
      value: 'ACCESSORIES',
    },
    {
      label: 'Sports',
      value: 'SPORTS',
    },
    {
      label: 'Home',
      value: 'HOME',
    },
    {
      label: 'Subscriptions',
      value: 'SUBSCRIPTIONS',
    },
    {
      label: 'Utilities',
      value: 'UTILITIES',
    },
    {
      label: 'Online Shopping',
      value: 'ONLINE_SHOPPING',
    },
    {
      label: 'Other',
      value: 'OTHER',
    },
  ] as Category[], // Explicitly typing the array as Category[]

  INCOME: [
    {
      label: 'Salary',
      value: 'SALARY',
    },
    {
      label: 'Freelance',
      value: 'FREELANCE',
    },
    {
      label: 'Cashbacks',
      value: 'CASHBACKS',
    },
    {
      label: 'Bonus',
      value: 'BONUS',
    },

    {
      label: 'Investment Income',
      value: 'INVESTMENT',
    },
    {
      label: 'Dividends',
      value: 'DIVIDENDS',
    },
    {
      label: 'Other',
      value: 'OTHER',
    },
  ] as Category[],

  TRANSFER: [
    {
      label: 'Bank Transfer',
      value: 'BANK_TRANSFER',
    },
    {
      label: 'UPI Transfer',
      value: 'UPI_TRANSFER',
    },
    {
      label: 'Other',
      value: 'OTHER',
    },
  ] as Category[],

  BORROW: [
    {
      label: 'In Exchange',
      value: 'IN_EXCHANGE',
    },
    {
      label: 'Credit Card',
      value: 'CREDIT_CARD',
    },
    {
      label: 'Personal Loan',
      value: 'PERSONAL_LOAN',
    },
    {
      label: "EMI",
      value: "EMI",
    },
    {
      label: 'Other',
      value: 'OTHER',
    },
  ] as Category[],

  LEND: [
    {
      label: 'In Exchange',
      value: 'IN_EXCHANGE',
    },
    {
      label: "EMI",
      value: "EMI",
    },
    {
      label: 'Other',
      value: 'OTHER',
    },
  ] as Category[],
};

export const accountTypes: AccountType[] = [
  {
    label: 'Current',
    value: AccountTypeEnum.CURRENT,
  },
  {
    label: 'Savings',
    value: AccountTypeEnum.SAVINGS,
  },
  {
    label: 'Cash',
    value: AccountTypeEnum.CASH,
  },
  {
    label: 'Salary',
    value: AccountTypeEnum.SALARY,
  },
  {
    label: 'Credit Card',
    value: AccountTypeEnum.CREDIT_CARD,
  },
  {
    label: 'E-Wallet',
    value: AccountTypeEnum.E_WALLET,
  },
  {
    label: 'E-Account',
    value: AccountTypeEnum.E_ACCOUNT,
  },
  {
    label: 'Current/Savings',
    value: AccountTypeEnum.CURRENT_SAVINGS,
  },
];

export const getAccountDetails = (
  accountId: string,
  allAccounts: AccountResponse[],
) => {
  if (!allAccounts) return null;
  return allAccounts.find((account) => account.id === accountId);
};
