import { Tooltip } from '@mantine/core';
import {
  IconBuildingBank,
  IconCashBanknoteOff,
  IconContract,
  IconDashboard,
  IconReceiptDollar,
  IconReportAnalytics,
  IconTransactionRupee,
} from '@tabler/icons-react';
import React from 'react';

import NavLink from '../commons/NavLink';

const userRoutes = [
  {
    link: '/dashboard',
    label: 'Home',
    icon: IconDashboard,
  },
  {
    link: '/dashboard/accounts',
    label: 'Accounts',
    icon: IconBuildingBank,
  },
  {
    link: '/dashboard/transactions',
    label: 'Transactions',
    icon: IconTransactionRupee,
  },
  {
    link: '/dashboard/borrow-lend',
    label: 'Borrow / Lend',
    icon: IconContract,
  },
  {
    link: '/dashboard/budgets',
    label: 'Budgets',
    icon: IconCashBanknoteOff,
  },
  {
    link: '/dashboard/analytics',
    label: 'Analytics',
    icon: IconReportAnalytics,
  },
  {
    link: '/dashboard/bills',
    label: 'Bills',
    icon: IconReceiptDollar,
  },
];

type Props = {
  isSidebarOpen: boolean;
};

const UserSidebar: React.FC<Props> = ({ isSidebarOpen }) => {
  if (!isSidebarOpen) {
    return (
      <div className="flex flex-col px-1 py-2">
        {userRoutes.map((route) => (
          <Tooltip
            key={route.link}
            label={route.label}
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <NavLink
              href={route.link}
              leftSection={<route.icon />}
              className="mt-1 !rounded-sm hover:!bg-primary-blue-light"
            />
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col px-1 py-2">
      {userRoutes.map((route) => (
        <NavLink
          href={route.link}
          key={route.link}
          label={route.label}
          leftSection={<route.icon />}
          className="mt-1 !rounded-sm hover:!bg-primary-blue-light"
        />
      ))}
    </div>
  );
};

export default UserSidebar;
