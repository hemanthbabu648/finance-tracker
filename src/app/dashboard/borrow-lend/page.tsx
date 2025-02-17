'use client'

import SegmentedControl from '@/components/commons/SegmentedControl'
import BasicTable from '@/components/tables/BaseTable'
import StatsCard from '@/components/users/StatsCard'
import { transactionTypeValue } from '@/types/finance'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

type statusType = 'NOT SETTLED' | 'SETTLED' | 'PARTIALLY SETTLED' | 'SENT' | 'RECEIVED'

type transactionResponse = {
    id: string
    account: string
    tranactionType: transactionTypeValue
    borrowedFrom?: string
    lendedTo?: string
    amount: number
    date: string
    returnDate: string
    note: string
    status: statusType
}

type tabType = {
    label: string,
    value: transactionTypeValue
}

const tabs: tabType[] = [
    { label: 'Debts', value: "BORROW" },
    { label: 'Lend', value: "LEND" },
]


function DebtsPage() {
    const [tab, setTab] = React.useState<transactionTypeValue>("BORROW");

    const apiData: transactionResponse[] = [
        {
            id: '1',
            account: 'SBI-4747',
            tranactionType: 'BORROW',
            borrowedFrom: 'S.H.B',
            amount: 1000,
            date: '2020-01-01',
            returnDate: '2020-01-01',
            note: 'Salary',
            status: 'NOT SETTLED'
        },
        {
            id: '2',
            account: 'SBI-4747',
            tranactionType: 'BORROW',
            borrowedFrom: 'S.H.B',
            returnDate: '2020-01-01',
            amount: 1000,
            date: '2020-01-01',
            note: 'Salary',
            status: 'SETTLED'
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
            header: 'Received From',
            cell: (row) => row.renderValue(),
            accessorKey: 'borrowedFrom',
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
            header: 'Return Date',
            cell: (row) => row.renderValue(),
            accessorKey: 'returnDate',
        },
        {
            header: 'Note',
            cell: (row) => row.renderValue(),
            accessorKey: 'note',
        },
        {
            header: 'Status',
            cell: (row) => row.renderValue(),
            accessorKey: 'status',
        }
    ], [])

    return (
        <div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard />
                </div>
                <div className='w-60 mb-6'>
                    <SegmentedControl
                        data={tabs}
                        onChange={(value) => setTab(value as transactionTypeValue)}
                        value={tab}
                        classNames={{
                            root: 'bg-alabaster'
                        }}
                        fullWidth
                        color="blue"
                    />
                </div>
                {tab === 'BORROW' ? <BasicTable data={apiData} columns={columns} /> : <BasicTable data={apiData} columns={columns} />}
            </div>

        </div>
    )
}

export default DebtsPage