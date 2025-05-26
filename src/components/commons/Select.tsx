import { NativeSelect, NativeSelectProps } from '@mantine/core';
import React from 'react';

type SelectProps = NativeSelectProps;

const Select: React.FC<SelectProps> = (props) => {
  return <NativeSelect {...props} />;
};

export default Select;
