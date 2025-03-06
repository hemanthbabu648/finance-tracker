import { NumberInput as MNumberInput, NumberInputProps } from '@mantine/core'
import React from 'react'

type Props = NumberInputProps

const NumberInput = (props: Props) => {
  return <MNumberInput {...props} />
}

export default NumberInput
