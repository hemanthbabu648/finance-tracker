import { Switch, SwitchProps } from '@mantine/core';
import React from 'react';

type SwitchInputProps = SwitchProps;

const SwitchInput: React.FC<SwitchInputProps> = (props) => {
  return <Switch {...props} />;
};

export default SwitchInput;
