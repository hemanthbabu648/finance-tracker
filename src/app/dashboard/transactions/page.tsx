'use client'

import { useDisclosure } from '@mantine/hooks'
import {
  IconCreditCard,
  IconMoneybag,
  IconPigMoney,
  IconPlus,
  IconWallet,
} from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

import Button from '@/components/commons/Button'
import Drawer from '@/components/commons/Drawer'
import AddTransactionForm from '@/components/forms/AddTransactionForm'
import BasicTable from '@/components/tables/BaseTable'
import StatsCard from '@/components/users/StatsCard'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  fetchAllTransactions,
  fetchTransactionStats,
} from '@/redux/slices/TransactionSlice'
import { TransactionResponse } from '@/types'
import { getFormattedDate } from '@/utils/DateUtils'
import { getAccountDetails } from '@/utils/Utils'

function TransactionsPage() {
  const dispatch = useAppDispatch()
  const {
    allTransactions,
    loading,
    allAccounts,
    statsLoading,
    transactionStats: { currentMonthOverView },
  } = useAppSelector((state) => {
    return {
      allTransactions: state.transaction.allTransactions,
      loading: state.transaction.loading,
      allAccounts: state.account.userAccounts,
      statsLoading: state.transaction.statsLoading,
      transactionStats: state.transaction.transactionStats,
    }
  })
  const [opened, { open, close }] = useDisclosure(false)

  const statsData = [
    {
      title: 'Balance',
      value: `₹${currentMonthOverView?.remaining.toFixed(2)}`,
      description: 'Current Month Remaining',
      icon: <IconWallet className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Income',
      value: `₹${currentMonthOverView?.income.toFixed(2)}`,
      description: 'All Earnings',
      icon: <IconMoneybag className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Expenses',
      value: `₹${currentMonthOverView?.expenses.toFixed(2)}`,
      description: 'All Expenses',
      icon: <IconCreditCard className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Savings',
      value: `₹${currentMonthOverView?.savings.toFixed(2)}`,
      description: 'All Savings',
      icon: <IconPigMoney className="h-6 w-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ]

  const columns = React.useMemo<ColumnDef<TransactionResponse>[]>(
    () => [
      {
        header: 'Account',
        cell: ({ row }) => (
          <div>
            {getAccountDetails(row.original.accountId, allAccounts)
              ?.accountName || ''}
          </div>
        ),
        accessorKey: 'account',
      },
      {
        header: 'Transaction Type',
        cell: (row) => row.renderValue(),
        accessorKey: 'transactionType',
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
        cell: ({ row }) => (
          <div>{getFormattedDate(row.original.createdAt)}</div>
        ),
        accessorKey: 'createdAt',
      },
      {
        header: 'Note',
        cell: (row) => row.renderValue(),
        accessorKey: 'note',
      },
    ],
    [allAccounts],
  )

  React.useEffect(() => {
    let isMounted = true // Flag to prevent duplicate calls

    const fetchTransactions = async () => {
      if (!isMounted) return
      await dispatch(fetchTransactionStats())
      if (!isMounted) return
      await dispatch(fetchAllTransactions())
    }

    fetchTransactions()

    return () => {
      isMounted = false // Cleanup function
    }
  }, [dispatch])

  return (
    <div>
      <div className="space-y-6">
        <StatsCard stats={statsData} loading={statsLoading} />

        <div className="flex justify-end">
          <Button
            radius="md"
            leftSection={<IconPlus className="inline" size={20} />}
            onClick={open}
          >
            Add Transaction
          </Button>
        </div>
        <BasicTable
          data={allTransactions}
          columns={columns}
          isLoading={loading}
        />
      </div>
      <Drawer opened={opened} onClose={close} title="Create Transaction">
        <AddTransactionForm />
      </Drawer>
    </div>
  )
}

export default TransactionsPage
