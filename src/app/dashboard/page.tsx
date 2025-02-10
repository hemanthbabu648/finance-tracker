

import {
  IconMoneybag,
  IconPigMoney,
  IconReportMoney,
  IconWallet
} from '@tabler/icons-react';

import RecentTransactions from '@/components/tables/RecentTransactions';
import AlertsCard from '@/components/users/AlertsCard';
import ReportsBillsCard from '@/components/users/ReportsBillsCard';
import StatsCard from '@/components/users/StatsCard';
import UpcomingTasksCard from '@/components/users/UpcomingTasksCard';
import BaseCard from '@/components/users/BaseCard';
import Link from 'next/link';

export default function DashboardOverview() {
  const stats = [
    {
      title: 'Total Balance',
      value: '$12,450',
      change: '+10%',
      category: 'Finance',
      icon: <IconWallet className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Cash Inflow',
      value: '$24',
      change: '+4',
      category: 'Income',
      icon: <IconMoneybag className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Cash Outflow',
      value: '$12',
      change: '-15%',
      category: 'Expense',
      icon: <IconReportMoney className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'Savings',
      value: '$8',
      change: '+2',
      category: 'Savings',
      icon: <IconPigMoney className="w-6 h-6 text-orange-600" />,
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-6 max-w-7xl lg:max-w-full mx-auto space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} stats={stat} />
        ))}
      </div>

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
