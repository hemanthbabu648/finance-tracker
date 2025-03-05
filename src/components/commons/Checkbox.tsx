import {
  Checkbox as MCheckbox,
  CheckboxProps as MCheckboxProps,
} from "@mantine/core";
import React from "react";

type CheckboxProps = MCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MCheckbox {...props} />;
};

export default Checkbox;
