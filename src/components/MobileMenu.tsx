'use client';

import {
  IconBuildingBank,
  IconContract,
  IconHome,
  IconReportAnalytics,
  IconTransactionRupee,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const userTabs = [
  {
    href: '/dashboard',
    label: 'Home',
    icon: <IconHome size="1.5rem" />,
  },
  {
    href: '/dashboard/accounts',
    label: 'Accounts',
    icon: <IconBuildingBank size="1.5rem" />,
  },
  {
    href: '/dashboard/transactions',
    label: 'Transactions',
    icon: <IconTransactionRupee size="1.5rem" />,
  },
  {
    href: '/dashboard/borrow-lend',
    label: 'Borrow/Lend',
    icon: <IconContract size="1.5rem" />,
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: <IconReportAnalytics size="1.5rem" />,
  },
];

const MobileMenu: React.FC = () => {
  const pathname = usePathname();
  const isActive = (href: string): boolean => pathname === href;
  return (
    <div className="flex w-full items-center justify-between gap-1 px-1">
      {userTabs.map((tab) => (
        <Link
          key={tab.label}
          href={tab.href}
          className={`flex flex-1 flex-col items-center justify-center py-2 text-center ${
            isActive(tab.href)
              ? 'text-navy-blue-300 rounded-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.icon}
          <span className="text-xs">{tab.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
