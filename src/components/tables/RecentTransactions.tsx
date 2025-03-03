'use client';


import { TransactionResponse } from '@/types';
import { getFormattedDate } from '@/utils/DateUtils';
import { Table } from '@mantine/core'
import React from 'react'

type recentTransactionResponse = {
    date: string,
    type: string,
    amount: number
    account: string,
    note: string,
}
type Props = {
    loading: boolean
    data: TransactionResponse[]
}

const data: recentTransactionResponse[] = [
    {
        date: '2020-01-01',
        type: 'expense',
        amount: 100,
        account: 'bank',
        note: 'some note'
    },
    {
        date: '2020-01-01',
        type: 'expense',
        amount: 100,
        account: 'bank',
        note: 'some note'
    },
    {
        date: '2020-01-01',
        type: 'income',
        amount: 100,
        account: 'bank',
        note: 'some note'
    }
]

const RecentTransactions: React.FC<Props> = ({
    loading,
    data = []
}) => {

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <p>Loading...</p>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className='flex justify-center items-center'>
                <p>No data found</p>
            </div>
        )
    }

    const getModifiedData = data.map((row) => {
        return {
            date: getFormattedDate(row.createdAt),
            type: row.transactionType,
            amount: row.amount,
            account: row.accountId,
            note: row.note
        }
    })

    const rows = getModifiedData.slice(0, 5).map((row, index) => {
        return (
            <Table.Tr key={index + row.date}>
                <Table.Td>

                    {row.date}
                </Table.Td>
                <Table.Td>{row.type}</Table.Td>
                <Table.Td>

                    {row.amount}

                </Table.Td>
                <Table.Td>{row.account}</Table.Td>
                <Table.Td>
                    {row.note}
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>Account Id</Table.Th>
                        <Table.Th>Note</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

export default RecentTransactions