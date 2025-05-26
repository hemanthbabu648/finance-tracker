'use client';

import { UnstyledButton } from '@mantine/core';
import {
  IconBrandRevolut,
  IconLayoutSidebarFilled,
  IconLayoutSidebarRightFilled,
} from '@tabler/icons-react';
import React from 'react';
import { useDispatch } from 'react-redux';

import MobileMenu from '@/components/MobileMenu';
import UserInfoMenu from '@/components/UserInfoMenu';
import UserSidebar from '@/components/users/UserSidebar';
import { useAppSelector } from '@/redux/hooks';
import { fetchUserAccounts } from '@/redux/slices/AccountSlice';
import { fetchUserDetails } from '@/redux/slices/UserSlice';
import { AppDispatch } from '@/redux/store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const userId = React.useMemo(() => userDetails?.id, [userDetails]);

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchUserAccounts(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="flex h-screen flex-col-reverse justify-between sm:flex-row sm:justify-normal">
      {/* Navigation Bar for Large Screens */}
      <div className="hidden md:block">
        <nav
          className={`${isSidebarOpen ? 'w-60' : 'w-16'} flex flex-col justify-between bg-primary-dark text-white`}
        >
          {/* Brand Logo And Name */}
          <div
            className={`flex ${isSidebarOpen ? 'justify-between' : 'justify-center'} items-center border-b border-gray-600 p-1`}
          >
            {isSidebarOpen && (
              <div className="flex items-center gap-2">
                <IconBrandRevolut size={40} />
                <div>
                  <p className="whitespace-nowrap text-sm">Finomic</p>
                  <p className="whitespace-nowrap text-xs">
                    Finance Made Simple
                  </p>
                </div>
              </div>
            )}
            <UnstyledButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? (
                <IconLayoutSidebarRightFilled size={28} />
              ) : (
                <IconLayoutSidebarFilled size={28} />
              )}
            </UnstyledButton>
          </div>
          {/* Navigation Links */}
          <div className="h-[calc(100vh-113px)]">
            <UserSidebar isSidebarOpen={isSidebarOpen} />
          </div>
          <div className="bg-blue-400">
            <UserInfoMenu openSidebar={isSidebarOpen} />
          </div>
        </nav>
      </div>
      {/* Navigation Bar for Mobile Screens */}
      <div className="fixed bottom-0 left-0 right-0 flex h-16 bg-primary-dark text-white md:hidden">
        <MobileMenu />
      </div>
      <main className="scrollbar-hide mx-auto w-full flex-grow overflow-y-scroll bg-gray-100 p-6 pb-20 sm:max-w-7xl sm:pb-6 lg:max-w-full">
        {children}
      </main>
    </div>
  );
}
