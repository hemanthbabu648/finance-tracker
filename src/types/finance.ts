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