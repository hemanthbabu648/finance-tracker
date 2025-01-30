import React, { forwardRef } from "react";
import {
  PasswordInput as MPasswordInput,
  PasswordInputProps as MPasswordInputProps,
} from "@mantine/core";

type PasswordInputProps = MPasswordInputProps;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    return <MPasswordInput {...props} ref={ref} />;
  }
);

PasswordInput.displayName = "PasswordInput"; // Helps with debugging

export default PasswordInput;
