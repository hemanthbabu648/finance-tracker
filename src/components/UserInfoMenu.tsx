'use client';

import { Menu } from '@mantine/core';
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import { logout } from '@/serverActions/auth';

import Avatar from './commons/Avatar';
import SwitchInput from './commons/SwitchInput';

type UserInfoMenuProps = {
  openSidebar: boolean;
};

const UserInfoMenu: React.FC<UserInfoMenuProps> = ({ openSidebar }) => {
  const [opened, setOpened] = useState(false);

  const { userDetails } = useSelector((state: RootState) => state.auth);

  return (
    <Menu
      shadow="md"
      width={246}
      opened={opened}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <div
          className="flex cursor-pointer items-center justify-between gap-1 border-t border-gray-300 bg-primary-dark px-2 py-3"
          onClick={() => setOpened(true)}
        >
          <div className="flex gap-2">
            <Avatar
              src={userDetails?.profileImage}
              name={userDetails?.fullName}
              color="initials"
              alt="user image"
              size="md"
            />
            {openSidebar && (
              <div className="w-36">
                <p className="text-light-200 overflow-hidden text-ellipsis text-sm">
                  {userDetails?.fullName}
                </p>
                <p className="w-full overflow-hidden text-ellipsis text-xs text-gray-200">
                  {userDetails?.email}
                </p>
              </div>
            )}
          </div>
          {openSidebar && <IconChevronRight />}
        </div>
      </Menu.Target>
      <Menu.Dropdown
        className="!border !border-primary-dark !bg-primary-dark"
        aria-hidden="false"
      >
        <Menu.Label>User Info</Menu.Label>
        <Menu.Item
          className="!text-white hover:!bg-primary-blue-light hover:!text-white"
          leftSection={<IconUser className="h-4 w-4" />}
        >
          <Link href="/dashboard/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item
          className="!text-white hover:!bg-primary-blue-light hover:!text-white"
          rightSection={<SwitchInput color="orange" />}
        >
          Switch Theme
        </Menu.Item>
        <Menu.Divider className="!bg-gray-400" />
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          className="!text-white hover:!bg-primary-blue-light hover:!text-white"
          leftSection={<IconSettings className="h-4 w-4" />}
        >
          <Link href="/dashboard/settings">Settings</Link>
        </Menu.Item>
        <Menu.Divider className="!bg-gray-400" />
        <Menu.Item
          className="!text-white hover:!bg-primary-blue-light hover:!text-white"
          rightSection={<IconLogout className="h-4 w-4" />}
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserInfoMenu;
