import {
  SegmentedControl as MSegmentedControl,
  SegmentedControlProps as MSegmentedControlProps,
} from '@mantine/core';
import React from 'react';

type SegmentedControlProps = MSegmentedControlProps;

const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  return <MSegmentedControl {...props} />;
};

export default SegmentedControl;
