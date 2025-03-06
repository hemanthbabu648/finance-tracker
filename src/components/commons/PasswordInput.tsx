import {
  PasswordInput as MPasswordInput,
  PasswordInputProps as MPasswordInputProps,
} from '@mantine/core'
import React, { forwardRef } from 'react'

type PasswordInputProps = MPasswordInputProps

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    return <MPasswordInput {...props} ref={ref} />
  },
)

PasswordInput.displayName = 'PasswordInput' // Helps with debugging

export default PasswordInput
