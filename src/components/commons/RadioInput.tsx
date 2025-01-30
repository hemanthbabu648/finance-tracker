import React from "react";
import { Radio, RadioProps } from "@mantine/core";

type RadioInputProps = RadioProps;

const RadioInput: React.FC<RadioInputProps> = (props) => {
  return <Radio {...props} />;
};

export default RadioInput;
