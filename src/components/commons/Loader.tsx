import { Loader as MLoader, LoaderProps as MLoaderProps } from "@mantine/core";
import React from "react";

type LoaderProps = MLoaderProps;

const Loader: React.FC<LoaderProps> = (props) => {
  return <MLoader {...props} />;
};

export default Loader;
