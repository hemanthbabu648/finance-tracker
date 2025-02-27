'use client'

import RecentTransactions from '@/components/tables/RecentTransactions';
import AlertsCard from '@/components/users/AlertsCard';
import BaseCard from '@/components/users/BaseCard';
import ReportsBillsCard from '@/components/users/ReportsBillsCard';
import StatsCard from '@/components/users/StatsCard';
import UpcomingTasksCard from '@/components/users/UpcomingTasksCard';
import { useAppSelector } from '@/redux/hooks';
import { IconCreditCard, IconMoneybag, IconPigMoney, IconWallet } from '@tabler/icons-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const { accountStats, loading } = useAppSelector(state => state.account);

  const statsData = [
    {
      title: 'Total Balance',
      value: `₹${accountStats?.total}`,
      description: 'All Accounts',
      icon: <IconWallet className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Current Balance',
      value: `₹${accountStats?.current}`,
      description: 'Exclude Savins & Credit Card',
      icon: <IconMoneybag className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Credit Card',
      value: `₹${accountStats?.creditCard}`,
      description: 'Credit Card Limit Available',
      icon: <IconCreditCard className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Savings',
      value: `₹${accountStats?.savings}`,
      description: 'All Savings',
      icon: <IconPigMoney className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCard loading={loading} stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BaseCard
          title="Recent Transactions"
          headerAction={
            <Link
              href="/dashboard/transactions"
              className='text-primary-light hover:underline'
            >View all</Link>
          }
          cardClassNames='lg:col-span-2'
        >
          <RecentTransactions />
        </BaseCard>

        <BaseCard
          title="Alerts and Notifications"
        >
          <AlertsCard />
        </BaseCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BaseCard
          title="Upcoming Tasks"
        >
          <UpcomingTasksCard />
        </BaseCard>

        <BaseCard
          title="Reports and Bills"
        >
          <ReportsBillsCard />
        </BaseCard>
      </div>
    </div>
  );
}
