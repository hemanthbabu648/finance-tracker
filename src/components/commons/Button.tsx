import React from 'react'
import { Button as MButton, ButtonProps  as MButtonProps } from '@mantine/core'

type ButtonProps = MButtonProps;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <MButton {...props}/>
  )
}

export default Button