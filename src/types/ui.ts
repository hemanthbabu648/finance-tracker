export type StatsResponse = {
    title: string,
    value: string,
    change?: string,
    category?: string,
    description?: string,
    icon: React.ReactNode,
    bgColor: string,
}

export type recentTransactionResponse = {
    date: string,
    type: string,
    amount: number
    account: string,
    note: string,
}

export enum ACCOUNTTYPEENUM {
    SAVINGS = 'SAVINGS',
    CASH = 'CASH',
    SALARY = 'SALARY',
    CREDIT_CARD = 'CREDIT CARD',
    E_WALLET = 'E-WALLET',
    E_ACCOUNT = 'E-ACCOUNT',
}

export type accountType = {
    label: string,
    value: ACCOUNTTYPEENUM
}

export enum TRANSACTIONTYPEENUM {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
    TRANSFER = "TRANSFER",
    BORROW = "BORROW",
    LEND = "LEND"
}

export type transactionTypeValue = "INCOME" | "EXPENSE" | "TRANSFER" | "BORROW" | "LEND"

export type transactionType = {
    label: string,
    value: transactionTypeValue
}

export interface Category {
    label: string;
    value: string;
}

export type LendTabValues = "GIVEN" | "RECEIVED"

export type BorrowTabValues = "TAKEN" | "RETURNED"

export type BorrowLendTabTypes = {
    label: string,
    value: BorrowTabValues | LendTabValues
}