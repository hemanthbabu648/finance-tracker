import { Drawer as MDrawer, DrawerProps as MDrawerProps } from '@mantine/core';
import React from 'react';

type DrawerProps = MDrawerProps;

const Drawer: React.FC<DrawerProps> = (props) => {
  return <MDrawer {...props} position="right" size="lg" />;
};

export default Drawer;
