'use client';

import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCreditCard,
  IconMoneybag,
  IconPigMoney,
  IconPlus,
  IconWallet,
} from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import Drawer from '@/components/commons/Drawer';
import CreateAccountForm from '@/components/forms/CreateAccountForm';
import BasicTable from '@/components/tables/BaseTable';
import StatsCard from '@/components/users/StatsCard';
import { useAppSelector } from '@/redux/hooks';
import { AccountResponse } from '@/types';
import { getFormattedDate } from '@/utils/DateUtils';

function AccountsPage() {
  const { userAccounts, accountStats, loading } = useAppSelector(
    (state) => state.account,
  );
  const [opened, { open, close }] = useDisclosure(false);

  const statsData = [
    {
      title: 'Total Balance',
      value: `₹${accountStats?.total.toFixed(2)}`,
      description: 'All Accounts',
      icon: <IconWallet className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Current Balance',
      value: `₹${accountStats?.current.toFixed(2)}`,
      description: 'Exclude Savins & Credit Card',
      icon: <IconMoneybag className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Credit Card',
      value: `₹${accountStats?.creditCard.toFixed(2)}`,
      description: 'Credit Card Limit Available',
      icon: <IconCreditCard className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Savings',
      value: `₹${accountStats?.savings.toFixed(2)}`,
      description: 'All Savings',
      icon: <IconPigMoney className="h-6 w-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  const columns = React.useMemo<ColumnDef<AccountResponse>[]>(
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
        header: 'Amount',
        cell: (row) => row.renderValue(),
        accessorKey: 'amount',
      },
      {
        header: 'Created At',
        cell: ({ row }) => (
          <div>{getFormattedDate(row.original.createdAt)}</div>
        ),
        accessorKey: 'createdAt',
      },
    ],
    [],
  );

  return (
    <div>
      <div className="space-y-6">
        <StatsCard stats={statsData} loading={loading} />
        <div className="flex justify-end">
          <Button
            radius="md"
            leftSection={<IconPlus className="inline" size={20} />}
            onClick={open}
          >
            Add Account
          </Button>
        </div>
        <BasicTable data={userAccounts} columns={columns} isLoading={loading} />
      </div>
      <Drawer opened={opened} onClose={close} title="Create an Account">
        <CreateAccountForm />
      </Drawer>
    </div>
  );
}

export default AccountsPage;
