import React from "react";
import {
  SegmentedControl as MSegmentedControl,
  SegmentedControlProps as MSegmentedControlProps,
} from "@mantine/core";

type SegmentedControlProps = MSegmentedControlProps;

const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  return <MSegmentedControl {...props} />;
};

export default SegmentedControl;
