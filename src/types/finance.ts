export type statsType = {
    title: string,
    value: string,
    change: string,
    category: string,
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
    SAVINGS = 'Savings',
    CASH = 'Cash',
    SALARY = 'Salary',
    CREDIT_CARD = 'Credit Card',
    E_WALLET = 'Ewallet',
    E_ACCOUNT = 'Eaccount',
}

export type accountType = {
    label: string,
    value: ACCOUNTTYPEENUM
}