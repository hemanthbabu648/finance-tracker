import { Breadcrumbs } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

type ItemsType = {
  title: string;
  href: string;
};

type BreadCrumbsProps = {
  items: ItemsType[];
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ items }) => {
  return (
    <Breadcrumbs>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return isLastItem ? (
          <span key={item.title} className="text-grey text-lg font-light">
            {item.title}
          </span>
        ) : (
          <Link
            href={item.href}
            key={item.title}
            className="text-lg font-semibold"
          >
            {item.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
