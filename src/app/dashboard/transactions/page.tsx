'use client';

import Button from '@/components/commons/Button';
import Drawer from '@/components/commons/Drawer';
import AddTransactionForm from '@/components/forms/AddTransactionForm';
import BasicTable from '@/components/tables/BaseTable';
import StatsCard from '@/components/users/StatsCard';
import { transactionTypeValue } from '@/types/finance';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

type transactionResponse = {
    id: string
    account: string
    tranactionType: transactionTypeValue
    category: string
    amount: number
    date: string
    note: string
}

function TransactionsPage() {
    const [opened, { open, close }] = useDisclosure(false);

    const apiData: transactionResponse[] = [
        {
            id: '1',
            account: 'SBI-4747',
            tranactionType: 'INCOME',
            category: 'Salary',
            amount: 1000,
            date: '2020-01-01',
            note: 'Salary'
        },
        {
            id: '2',
            account: 'SBI-4747',
            tranactionType: 'EXPENSE',
            category: 'Food',
            amount: 1000,
            date: '2020-01-01',
            note: 'Salary'
        }
    ]

    const columns = React.useMemo<ColumnDef<transactionResponse>[]>(() => [
        {
            header: 'Account',
            cell: (row) => row.renderValue(),
            accessorKey: 'account',
        },
        {
            header: 'Transaction Type',
            cell: (row) => row.renderValue(),
            accessorKey: 'tranactionType',
        },
        {
            header: 'Category',
            cell: (row) => row.renderValue(),
            accessorKey: 'category',
        },
        {
            header: 'Amount',
            cell: (row) => row.renderValue(),
            accessorKey: 'amount',
        },
        {
            header: 'Date',
            cell: (row) => row.renderValue(),
            accessorKey: 'date',
        },
        {
            header: 'Note',
            cell: (row) => row.renderValue(),
            accessorKey: 'note',
        }
    ], [])

    return (
        <div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard />
                </div>
                <div className='flex justify-end'>
                    <Button
                        radius="md"
                        leftSection={<IconPlus className='inline' size={20} />}
                        onClick={open}
                    >
                        Add Transaction
                    </Button>
                </div>
                <BasicTable data={apiData} columns={columns} />
            </div>
            <Drawer opened={opened} onClose={close} title="Create an Account">
                <AddTransactionForm />
            </Drawer>
        </div>
    )
}

export default TransactionsPage