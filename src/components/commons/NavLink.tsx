'use client';

import {
  NavLink as MNavLink,
  NavLinkProps as MNavLinkProps,
} from '@mantine/core';
import Link from 'next/link';
import React from 'react';

// Update the NavLinkProps to include a ref type.
interface NavLinkProps extends Omit<MNavLinkProps, 'component'> {
  href: string;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, ...props }, ref) => {
    return (
      <Link href={href} passHref legacyBehavior>
        <MNavLink ref={ref} {...props} />
      </Link>
    );
  },
);

// Don't forget to display the proper display name for debugging.
NavLink.displayName = 'NavLink';

export default NavLink;
