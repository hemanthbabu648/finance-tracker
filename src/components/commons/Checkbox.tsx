import React from "react";
import {
  Checkbox as MCheckbox,
  CheckboxProps as MCheckboxProps,
} from "@mantine/core";

type CheckboxProps = MCheckboxProps;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MCheckbox {...props} />;
};

export default Checkbox;
