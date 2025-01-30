import React from "react";
import { Loader as MLoader, LoaderProps as MLoaderProps } from "@mantine/core";
type LoaderProps = MLoaderProps;

const Loader: React.FC<LoaderProps> = (props) => {
  return <MLoader {...props} />;
};

export default Loader;
