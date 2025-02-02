import React from 'react'
import { Button as MButton, ButtonProps as MButtonProps } from '@mantine/core'

interface ButtonProps extends MButtonProps { 
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <MButton {...props} />
  )
}

export default Button