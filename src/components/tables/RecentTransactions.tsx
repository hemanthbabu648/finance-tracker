'use client';

import { recentTransactionResponse } from '@/types/finance'
import { Table } from '@mantine/core'
import React from 'react'

type Props = {
    data?: recentTransactionResponse[]
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

const RecentTransactions: React.FC<Props> = () => {

    const rows = data.map((row, index) => {


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
                        <Table.Th>Account</Table.Th>
                        <Table.Th>Note</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

export default RecentTransactions