import React, { forwardRef } from "react";
import {
  TextInput as MTextInput,
  TextInputProps as MTextInputProps,
} from "@mantine/core";

type TextInputProps = MTextInputProps;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return <MTextInput {...props} ref={ref} />;
});

TextInput.displayName = "TextInput"; // Helps with debugging

export default TextInput;
