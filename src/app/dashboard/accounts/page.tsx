'use client'

import Drawer from '@/components/commons/Drawer';
import CreateAccountForm from '@/components/forms/CreateAccountForm';
import BasicTable from '@/components/tables/BaseTable';
import StatsCard from '@/components/users/StatsCard';
import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table';
import React from 'react'

type AccountData = {
    id: number
    accountName: string
    accountType: string
    initialAmount: number
    currency: string
    currentBalance: number
}


function AccountsPage() {

    const [opened, { open, close }] = useDisclosure(false);

    const apiData: AccountData[] = [
        {
            id: 1,
            accountName: 'SBI-4747',
            accountType: 'Salary',
            initialAmount: 1000,
            currency: 'INR',
            currentBalance: 1000
        },
        {
            id: 2,
            accountName: 'SBI-571471',
            accountType: 'Savings',
            initialAmount: 0,
            currency: 'INR',
            currentBalance: 3000
        }
    ]

    const columns = React.useMemo<ColumnDef<AccountData>[]>(
        () => [
            {
                header: 'Account Name',
                cell: (row) => row.renderValue(),
                accessorKey: 'accountName',
            },
            {
                header: 'Account Type',
                cell: (row) => row.renderValue(),
                accessorKey: 'accountType',
            },
            {
                header: 'Initial Amount',
                cell: (row) => row.renderValue(),
                accessorKey: 'initialAmount',
            },
            {
                header: 'Currency',
                cell: (row) => row.renderValue(),
                accessorKey: 'currency',
            },
            {
                header: 'Current Balance',
                cell: (row) => {
                    console.log(row)
                    return <div>{JSON.stringify(row.row.original.currentBalance)}</div>
                },
                accessorKey: 'currentBalance',
            },
        ],
        []
    )

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
                        Add Account
                    </Button>
                </div>
                <BasicTable data={apiData} columns={columns} />
            </div>
            <Drawer opened={opened} onClose={close} title="Create an Account">
                <CreateAccountForm />
            </Drawer>
        </div>
    )
}

export default AccountsPage