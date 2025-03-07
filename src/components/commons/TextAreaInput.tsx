import { Textarea, TextareaProps } from '@mantine/core';
import React from 'react';

type TextAreaInputProps = TextareaProps;

const TextAreaInput: React.FC<TextAreaInputProps> = (props) => {
  return <Textarea {...props} />;
};

export default TextAreaInput;
