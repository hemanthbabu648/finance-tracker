'use client';

import {
  IconCreditCard,
  IconMoneybag,
  IconPigMoney,
  IconWallet,
} from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

import RecentTransactions from '@/components/tables/RecentTransactions';
import AlertsCard from '@/components/users/AlertsCard';
import BaseCard from '@/components/users/BaseCard';
import ReportsBillsCard from '@/components/users/ReportsBillsCard';
import StatsCard from '@/components/users/StatsCard';
import UpcomingTasksCard from '@/components/users/UpcomingTasksCard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllTransactions } from '@/redux/slices/TransactionSlice';

export default function DashboardOverview() {
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.auth);
  const { accountStats, loading } = useAppSelector((state) => state.account);
  const { allTransactions, loading: transactionsLoading } = useAppSelector(
    (state) => state.transaction,
  );

  const statsData = [
    {
      title: 'Total Balance',
      value: `₹${accountStats?.total}`,
      description: 'All Accounts',
      icon: <IconWallet className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Current Balance',
      value: `₹${accountStats?.current}`,
      description: 'Exclude Savins & Credit Card',
      icon: <IconMoneybag className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Credit Card',
      value: `₹${accountStats?.creditCard}`,
      description: 'Credit Card Limit Available',
      icon: <IconCreditCard className="h-6 w-6 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Savings',
      value: `₹${accountStats?.savings}`,
      description: 'All Savings',
      icon: <IconPigMoney className="h-6 w-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  React.useEffect(() => {
    if (userDetails?.id) {
      dispatch(fetchAllTransactions(userDetails.id));
    }
  }, [dispatch, userDetails?.id]);

  return (
    <div className="space-y-6">
      <StatsCard loading={loading} stats={statsData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BaseCard
          title="Recent Transactions"
          headerAction={
            <Link
              href="/dashboard/transactions"
              className="text-primary-light hover:underline"
            >
              View all
            </Link>
          }
          cardClassNames="lg:col-span-2"
        >
          <RecentTransactions
            loading={transactionsLoading}
            data={allTransactions}
          />
        </BaseCard>

        <BaseCard title="Alerts and Notifications">
          <AlertsCard />
        </BaseCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BaseCard title="Upcoming Tasks">
          <UpcomingTasksCard />
        </BaseCard>

        <BaseCard title="Reports and Bills">
          <ReportsBillsCard />
        </BaseCard>
      </div>
    </div>
  );
}
