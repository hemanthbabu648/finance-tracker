import { ActionIcon } from '@mantine/core';
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-gray-300 px-4 py-2 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={50}
            height={40}
            alt="radiantways logo"
            style={{ width: 'auto', height: '40px' }}
          />
          <span className="whitespace-nowrap text-lg sm:text-xl">
            Radiant Ways
          </span>
        </div>
        <p className="text-center text-sm font-normal sm:text-base">
          &copy; 2025 Radiant Ways. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            className="hover:bg-primary-blue-light hover:text-white"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            className="hover:bg-primary-blue-light hover:text-white"
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="default"
            radius="xl"
            className="hover:bg-primary-blue-light hover:text-white"
          >
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
