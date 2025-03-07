import { Radio, RadioProps } from '@mantine/core';
import React from 'react';

type RadioInputProps = RadioProps;

const RadioInput: React.FC<RadioInputProps> = (props) => {
  return <Radio {...props} />;
};

export default RadioInput;
