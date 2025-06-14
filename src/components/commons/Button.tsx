import { Button as MButton, ButtonProps as MButtonProps } from '@mantine/core';
import React from 'react';

interface ButtonProps extends MButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return <MButton {...props} onClick={props.onClick} />;
};

export default Button;
