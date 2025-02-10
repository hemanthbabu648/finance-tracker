import RecentTransactions from '@/components/tables/RecentTransactions';
import AlertsCard from '@/components/users/AlertsCard';
import BaseCard from '@/components/users/BaseCard';
import ReportsBillsCard from '@/components/users/ReportsBillsCard';
import StatsCard from '@/components/users/StatsCard';
import UpcomingTasksCard from '@/components/users/UpcomingTasksCard';
import Link from 'next/link';

export default function DashboardOverview() {

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard />
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
