'use client';

import { useDisclosure } from '@mantine/hooks';
import {
  IconCreditCard,
  IconMoneybag,
  IconPigMoney,
  IconPlus,
} from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import Button from '@/components/commons/Button';
import Drawer from '@/components/commons/Drawer';
import SegmentedControl from '@/components/commons/SegmentedControl';
import BorrowTransactionForm from '@/components/forms/BorrowTransactionForm';
import LendTransactionForm from '@/components/forms/LendTransactionForm';
import BasicTable from '@/components/tables/BaseTable';
import StatsCard from '@/components/users/StatsCard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchAllMiscTransactions,
  fetchMiscTransactionStats,
} from '@/redux/slices/TransactionSlice';
import { useAuthUserId } from '@/redux/slices/UserSlice';
import { TransactionResponse } from '@/types';
import { TransactionType, TransactionTypeValue } from '@/types/ui';
import { getFormattedDate } from '@/utils/DateUtils';
import { getAccountDetails } from '@/utils/Utils';

const tabs: TransactionType[] = [
  { label: 'Borrow', value: 'BORROW' },
  { label: 'Lend', value: 'LEND' },
];

function BorrowLendPage() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(useAuthUserId);
  const { miscTransactions, loading, statsLoading, miscTransactionStats } =
    useAppSelector((state) => state.transaction);
  const allAccounts = useAppSelector((state) => state.account.userAccounts);

  const [tab, setTab] = React.useState<TransactionTypeValue>('BORROW');
  const [borrowOpened, { open: borrowOpen, close: borrowClose }] =
    useDisclosure(false);
  const [lendOpened, { open: lendOpen, close: lendClose }] =
    useDisclosure(false);

  const transactionType = tab === 'BORROW' ? 'Borrowed' : 'Lended';
  const currentMonth = miscTransactionStats.currentMonth;

  const statsData = [
    {
      title: transactionType,
      value:
        tab === 'BORROW'
          ? `₹${currentMonth?.received.toFixed(2)}`
          : `₹${currentMonth?.sent.toFixed(2)}`,
      description: `Total ${transactionType}`,
      icon: <IconMoneybag className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: tab === 'BORROW' ? 'Returned' : 'Received',
      value:
        tab === 'BORROW'
          ? `₹${currentMonth?.sent.toFixed(2)}`
          : `₹${currentMonth?.received.toFixed(2)}`,
      description: `${tab === 'BORROW' ? 'Total Returned' : 'Total Received'}`,
      icon: <IconCreditCard className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Remaining',
      value: `₹${currentMonth?.remaining.toFixed(2)}`,
      description: 'Remaining Balance',
      icon: <IconPigMoney className="h-6 w-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

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
        accessorKey: 'accountId',
      },
      {
        header: 'Transaction Type',
        cell: (row) => row.renderValue(),
        accessorKey: 'transactionType',
      },
      {
        header: 'Transaction Sub Type',
        cell: (row) => row.renderValue(),
        accessorKey: 'transactionSubType',
      },
      {
        header: 'Received From',
        cell: (row) => row.renderValue(),
        accessorKey: 'personName',
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
        header: 'Return Date',
        cell: ({ row }) => (
          <div>{getFormattedDate(row.original.returnAt!)}</div>
        ),
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
      },
    ],
    [allAccounts],
  );

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchMiscTransactionStats(userId!, tab));
      dispatch(fetchAllMiscTransactions(userId!, tab));
    }
  }, [dispatch, tab, userId]);

  return (
    <div>
      <div className="space-y-6">
        <StatsCard stats={statsData} loading={statsLoading} />
        <div className="mb-6 w-60">
          <SegmentedControl
            data={tabs}
            onChange={(value) => setTab(value as TransactionTypeValue)}
            value={tab}
            classNames={{
              root: 'bg-alabaster',
            }}
            fullWidth
            color="blue"
          />
        </div>
        {tab === 'BORROW' ? (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                radius="md"
                leftSection={<IconPlus className="inline" size={20} />}
                onClick={borrowOpen}
              >
                Add Transaction
              </Button>
            </div>
            <BasicTable
              data={miscTransactions}
              columns={columns}
              isLoading={loading}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button
                radius="md"
                leftSection={<IconPlus className="inline" size={20} />}
                onClick={lendOpen}
              >
                Add Transaction
              </Button>
            </div>
            <BasicTable
              data={miscTransactions}
              columns={columns}
              isLoading={loading}
            />
          </div>
        )}
      </div>
      <Drawer
        title="Borrow Transaction"
        opened={borrowOpened}
        onClose={borrowClose}
      >
        <BorrowTransactionForm />
      </Drawer>
      <Drawer title="Lend Transaction" opened={lendOpened} onClose={lendClose}>
        <LendTransactionForm />
      </Drawer>
    </div>
  );
}

export default BorrowLendPage;
